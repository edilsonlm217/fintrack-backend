import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters, Get, Query, Headers } from '@nestjs/common';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';

import { CommitmentExceptionFilter } from './commitment.exception.filter';
import { CommitmentOccurrenceService } from 'src/core/commitment-occurrence/commitment-occurrence.service';

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
  async findAll(
    @Headers('userId') userId: string,
    @Query('month') month: number,
    @Query('year') year: number
  ) {
    const commitments = await this.commitmentOccurrenceService.fetchCommitmentsWithOccurrencesForPeriod(userId, month, year);
    const totals = this.commitmentOccurrenceService.calculateTotals(commitments);

    return {
      message: 'Commitments retrieved successfully',
      totalCommitments: totals.totalCommitments,
      totalPaidInMonth: totals.totalPaidInMonth,
      totalPendingInMonth: totals.totalPendingInMonth,
      commitments,
      context: {
        month,
        year,
      },
    };
  }
}
