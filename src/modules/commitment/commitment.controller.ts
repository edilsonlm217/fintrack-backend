import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters, Get, Query } from '@nestjs/common';

import { CommitmentOccurrenceService } from '../../core/commitment-occurrence/commitment-occurrence.service';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';
import { FindCommitmentsByPeriodDto } from '../../common/dto/find-commitments-by-period.dto';
import { FindCommitmentsByPeriodResponse } from './interfaces/find-commitments-by-period-response.interface';

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

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseFilters(CommitmentExceptionFilter)
  async findByPeriod(
    @Query() query: FindCommitmentsByPeriodDto
  ): Promise<FindCommitmentsByPeriodResponse> {
    const commitments = await this.commitmentOccurrenceService.findCommitmentsByPeriod(
      query.userId,
      query.month,
      query.year
    );

    return {
      message: 'Commitments retrieved successfully',
      context: {
        month: query.month,
        year: query.year,
        userId: query.userId
      },
      commitments,
    };
  }
}
