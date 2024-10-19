import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { CommitmentService } from './commitment.service';
import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';
import { CommitmentExceptionFilter } from './commitment.exception.filter';
import { OccurrenceService } from '../occurrence/occurrence.service';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

@Controller('commitments')
export class CommitmentController {
  constructor(
    private readonly commitmentService: CommitmentService,
    private readonly occurrenceService: OccurrenceService,
  ) { }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(CommitmentExceptionFilter)
  async createCommitment(@Body() createCommitmentDto: CreateCommitmentDto) {
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
