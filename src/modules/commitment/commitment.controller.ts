import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { CommitmentService } from './commitment.service';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { CommitmentExceptionFilter } from './commitment.exception.filter';

@Controller('commitments')
export class CommitmentController {
  constructor(
    private readonly commitmentService: CommitmentService
  ) { }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(CommitmentExceptionFilter)
  async createCommitment(@Body() createCommitmentDto: CreateCommitmentDto) {
    const commitment = await this.commitmentService.create(createCommitmentDto);
    return {
      message: 'Commitment successfully created',
      data: commitment,
    };
  }
}
