import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters, Get, Query } from '@nestjs/common';

import { CommitmentOccurrenceService } from '../../core/commitment-occurrence/commitment-occurrence.service';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';
import { FindCommitmentsByPeriodDto } from '../../common/dto/find-commitments-by-period.dto';
import { FindCommitmentsByPeriodResponse } from './interfaces/find-commitments-by-period-response.interface';

import { CommitmentExceptionFilter } from './commitment.exception.filter';
import { FindCommitmentsByDateRangeDto } from 'src/common/dto/find-commitments-by-date-range.dto';

@Controller('commitments')
export class CommitmentController {
  constructor(
    private readonly commitmentOccurrenceService: CommitmentOccurrenceService
  ) { }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(CommitmentExceptionFilter)
  async createCommitment(@Body() createCommitmentDto: CreateCommitmentDto): Promise<CreateCommitmentResponse> {
    const { commitment, occurrences } = await this.commitmentOccurrenceService.createCommitment(createCommitmentDto);

    return {
      message: 'Commitment successfully created',
      commitment,
      occurrences
    };
  }
}
