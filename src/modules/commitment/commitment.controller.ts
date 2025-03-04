import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';

import { CommitmentOccurrenceService } from '../../core/commitment-occurrence/commitment-occurrence.service';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';

import { CommitmentExceptionFilter } from './commitment.exception.filter';
import { CreateCommitmentRequestDto } from './interfaces/create-commitment-request.dto';

@Controller('commitments')
export class CommitmentController {
  constructor(
    private readonly commitmentOccurrenceService: CommitmentOccurrenceService
  ) { }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(CommitmentExceptionFilter)
  async createCommitment(@Body() createCommitmentRequestDto: CreateCommitmentRequestDto): Promise<CreateCommitmentResponse> {
    const { commitment, occurrences } = await this.commitmentOccurrenceService.createCommitment(createCommitmentRequestDto);

    return {
      message: 'Commitment successfully created',
      commitment,
      occurrences
    };
  }
}
