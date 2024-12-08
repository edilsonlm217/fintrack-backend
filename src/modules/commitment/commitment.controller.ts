import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters, Get, Query, Headers } from '@nestjs/common';

import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CreateCommitmentResponse } from './interfaces/create-commitment-response.interface';

import { CommitmentExceptionFilter } from './commitment.exception.filter';
import { CommitmentOccurrenceService } from 'src/core/commitment-occurrence/commitment-occurrence.service';

@Controller('commitments')
export class CommitmentController {
  constructor(private readonly commitmentOccurrenceService: CommitmentOccurrenceService) { }

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
    const {
      data: commitments,
      totalPaidInMonth,
      totalPendingInMonth,
      totalOccurrences,
      totalCommitments,
      formattedMonthYear,
    } = await this.commitmentOccurrenceService.fetchCommitmentData(userId, month, year);

    return {
      message: 'Commitments retrieved successfully',
      totalCommitments,
      totalOccurrences,
      totalPaidInMonth,
      totalPendingInMonth,
      commitments,
      context: {
        month,
        year,
        formattedMonthYear
      },
    };
  }
}
