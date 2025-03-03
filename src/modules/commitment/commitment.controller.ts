import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';

import { CommitmentOccurrenceService } from '../../core/commitment-occurrence/commitment-occurrence.service';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';

import { CommitmentExceptionFilter } from './commitment.exception.filter';

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
