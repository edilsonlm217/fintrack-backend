import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters, Get } from '@nestjs/common';
import { CommitmentService } from '../../core/commitment/commitment.service';
import { OccurrenceService } from '../../core/occurrence/occurrence.service';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';

import { CommitmentExceptionFilter } from './commitment.exception.filter';
import { OccurrenceRepository } from '../../database/repositories/occurrence.repository';
import { CommitmentRepository } from 'src/database/repositories/commitment.repository';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';

@Controller('commitments')
export class CommitmentController {
  constructor(
    private readonly commitmentService: CommitmentService,
    private readonly occurrenceService: OccurrenceService,
    private readonly occurrenceRepository: OccurrenceRepository,
    private readonly commitmentRepository: CommitmentRepository,
  ) { }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(CommitmentExceptionFilter)
  async createCommitment(@Body() createCommitmentDto: CreateCommitmentDto): Promise<CreateCommitmentResponse> {
    const commitment = await this.commitmentService.create(createCommitmentDto);
    const occurrences = await this.occurrenceService.create(commitment);

    return {
      message: 'Commitment successfully created',
      commitment,
      occurrences
    };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    // 1. Buscar as ocorrências no intervalo especificado
    const occurrences = await this.occurrenceRepository.findByDateRange({
      userId: '5cfdcc1c-bd00-42b5-9d57-df20e01da291',
      month: 1,
      year: 2025
    });

    // 2. Extrair os `commitment_id` únicos
    const uniqueCommitmentIds = Array.from(
      new Set(occurrences.map((occurrence) => occurrence.commitment_id))
    );

    // 3. Buscar os commitments correspondentes
    const commitments = await this.commitmentRepository.findByIds(uniqueCommitmentIds);

    // 4. Criar um mapa para associar ocorrências aos seus commitments
    const occurrencesByCommitment = occurrences.reduce((map, occurrence) => {
      if (!map[occurrence.commitment_id]) {
        map[occurrence.commitment_id] = [];
      }
      map[occurrence.commitment_id].push({
        _id: occurrence._id,
        due_date: occurrence.due_date,
        amount: occurrence.amount,
        status: occurrence.status,
      });
      return map;
    }, {} as Record<string, Array<Omit<Occurrence, 'commitment_id'>>>);

    // 5. Unir os commitments com suas respectivas ocorrências
    const data = commitments.map((commitment) => ({
      _id: commitment._id,
      type: commitment.type,
      description: commitment.description,
      category: commitment.category,
      subcategory: commitment.subcategory,
      occurrences: occurrencesByCommitment[commitment._id] || [],
    }));

    // 6. Calcular os totais gerais do mês
    const totalPaidInMonth = data.reduce((sum, commitment) => {
      const totalPaid = commitment.occurrences.filter(occurrence => occurrence.status === OccurrenceStatus.PAID)
        .reduce((sum, occurrence) => sum + occurrence.amount, 0);
      return sum + totalPaid;
    }, 0);

    const totalPendingInMonth = data.reduce((sum, commitment) => {
      const totalPending = commitment.occurrences.filter(occurrence => occurrence.status === OccurrenceStatus.PENDING)
        .reduce((sum, occurrence) => sum + occurrence.amount, 0);
      return sum + totalPending;
    }, 0);

    // 7. Construir a resposta estruturada com metadados
    return {
      message: 'Commitments retrieved successfully',
      totalCommitments: data.length,
      totalOccurrences: occurrences.length,
      totalPaidInMonth,
      totalPendingInMonth,
      commitments: data,
    };
  }
}
