import { Injectable } from '@nestjs/common';
import { OccurrenceService } from '../../occurrence/occurrence.service';
import { CommitmentService } from '../../commitment/commitment.service';
import { UniqueValueExtractor } from './helpers/unique-value-extractor';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentMapperService } from '../commitment-mapper/commitment-mapper.service';
import { DateFormatterService } from '../date-formatter.service';
import { CommitmentStatsService } from '../commitment-stats.service';

@Injectable()
export class CommitmentDataService {
  constructor(
    private readonly occurrenceService: OccurrenceService,
    private readonly commitmentService: CommitmentService,
    private readonly commitmentMapperService: CommitmentMapperService,
    private readonly dateFormatterService: DateFormatterService,
    private readonly commitmentStatsService: CommitmentStatsService,
  ) { }

  async createCommitment(createCommitmentDto: CreateCommitmentDto) {
    const commitment = await this.commitmentService.create(createCommitmentDto);
    const occurrences = await this.occurrenceService.create(commitment);
    return { commitment, occurrences };
  }

  async fetchCommitmentsWithOccurrencesForPeriod(userId: string, month: number, year: number) {
    const { occurrences, commitments } = await this.fetchCommitmentsAndOccurrences(userId, month, year);
    const commitmentWithOccurrences = this.commitmentMapperService.mapCommitmentsWithOccurrences(commitments, occurrences);

    const {
      totalPaidInMonth,
      totalPendingInMonth
    } = this.commitmentStatsService.calculateTotals(commitmentWithOccurrences);

    const totalCommitments = commitments.length;
    const totalOccurrences = occurrences.length;

    const formattedMonthYear = this.dateFormatterService.formatMonthYear(month, year);

    return {
      data: commitmentWithOccurrences,
      totalPaidInMonth,
      totalPendingInMonth,
      totalCommitments,
      totalOccurrences,
      formattedMonthYear,
    };
  }

  private async fetchCommitmentsAndOccurrences(userId: string, month: number, year: number) {
    const occurrences = await this.occurrenceService.findByDateRange(userId, month, year);
    const uniqueCommitmentIds = UniqueValueExtractor.extractUniqueValues(occurrences, 'commitment_id');
    const commitments = await this.commitmentService.findByIds(uniqueCommitmentIds);
    return { commitments, occurrences };
  }
}
