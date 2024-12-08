import { Injectable } from '@nestjs/common';
import { OccurrenceService } from './occurrence/occurrence.service';
import { CommitmentService } from './commitment/commitment.service';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentStatsService } from './commitment-stats.service';
import { DateFormatterService } from './date-formatter.service';
import { UniqueValueExtractor } from './unique-value-extractor';
import { CommitmentMapper } from './commitment-mapper';

@Injectable()
export class CommitmentOccurrenceService {
  constructor(
    private readonly commitmentService: CommitmentService,
    private readonly occurrenceService: OccurrenceService,
    private readonly commitmentStatsService: CommitmentStatsService,
    private readonly dateFormatterService: DateFormatterService,
  ) { }

  async createCommitment(createCommitmentDto: CreateCommitmentDto) {
    const commitment = await this.commitmentService.create(createCommitmentDto);
    const occurrences = await this.occurrenceService.create(commitment);
    return { commitment, occurrences };
  }

  async fetchCommitmentData(userId: string, month: number, year: number) {
    const occurrences = await this.occurrenceService.findByDateRange(userId, month, year);
    const uniqueCommitmentIds = UniqueValueExtractor.extractUniqueValues(occurrences, 'commitment_id');
    const commitments = await this.commitmentService.findByIds(uniqueCommitmentIds);
    const occurrencesByCommitment = CommitmentMapper.mapOccurrencesToCommitments(occurrences);
    const data = CommitmentMapper.mergeCommitmentsWithOccurrences(commitments, occurrencesByCommitment);
    const { totalPaidInMonth, totalPendingInMonth } = this.commitmentStatsService.calculateTotals(data);
    const formattedMonthYear = this.dateFormatterService.formatMonthYear(month, year);
    const totalOccurrences = occurrences.length;
    const totalCommitments = commitments.length;

    return {
      data,
      totalPaidInMonth,
      totalPendingInMonth,
      formattedMonthYear,
      totalOccurrences,
      totalCommitments
    }
  }
}
