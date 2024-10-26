import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { CommitmentService } from '../../core/commitment/commitment.service';
import { OccurrenceService } from '../../core/occurrence/occurrence.service';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';

import { CommitmentExceptionFilter } from './commitment.exception.filter';

@Controller('commitments')
export class CommitmentController {
  constructor(
    private readonly commitmentService: CommitmentService,
    private readonly occurrenceService: OccurrenceService,
  ) { }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(CommitmentExceptionFilter)
  async createCommitment(@Body() createCommitmentDto: CreateCommitmentDto): Promise<CreateCommitmentResponse> {
    const commitment = await this.commitmentService.create(createCommitmentDto);
    const occurrences = await this.occurrenceService.create(commitment);

    return {
      message: 'Commitment successfully created',
      data: {
        commitment,
        occurrences
      },
    };
  }
}
