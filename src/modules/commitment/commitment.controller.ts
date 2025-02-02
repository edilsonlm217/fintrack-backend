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

  @Get('/by-month')
  @HttpCode(HttpStatus.OK)
  @UseFilters(CommitmentExceptionFilter)
  async findAllByMonth(
    @Query() query: FindCommitmentsByPeriodDto
  ): Promise<FindCommitmentsByPeriodResponse> {
    const commitments = await this.commitmentOccurrenceService.findAllByMonth(
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

  @Get('/by-date-range')
  @HttpCode(HttpStatus.OK)
  @UseFilters(CommitmentExceptionFilter)
  async findAllByDateRange(@Query() query: FindCommitmentsByDateRangeDto) {
    const commitments = await this.commitmentOccurrenceService.findAllByDateRange(
      query.userId,
      query.startDate,
      query.endDate
    );

    return {
      message: 'Commitments retrieved successfully',
      context: {
        startDate: query.startDate,
        endDate: query.endDate,
        userId: query.userId,
      },
      commitments,
    };
  }
}
