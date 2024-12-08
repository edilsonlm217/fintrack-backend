import { Injectable } from '@nestjs/common';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentStatsService } from './commitment-stats.service';
import { DateFormatterService } from './date-formatter.service';
import { CommitmentDataService } from './commitment-data.service';
import { CommitmentMapperService } from './commitment-mapper.service';

@Injectable()
export class CommitmentOccurrenceService {
  constructor(
    private readonly commitmentStatsService: CommitmentStatsService,
    private readonly commitmentDataService: CommitmentDataService,
    private readonly commitmentMapperService: CommitmentMapperService,
    private readonly dateFormatterService: DateFormatterService,
  ) {}

  async createCommitment(createCommitmentDto: CreateCommitmentDto) {
    return this.commitmentDataService.createCommitment(createCommitmentDto);
  }

  async fetchCommitmentData(userId: string, month: number, year: number) {
    const { commitments, occurrences } = await this.fetchData(userId, month, year);
    const data = this.mapCommitmentsWithOccurrences(commitments, occurrences);
    const stats = this.calculateStatistics(data, commitments.length, occurrences.length);
    return this.formatResponse(stats, month, year);
  }

  private async fetchData(userId: string, month: number, year: number) {
    return this.commitmentDataService.fetchCommitmentsAndOccurrences(userId, month, year);
  }

  private mapCommitmentsWithOccurrences(commitments, occurrences) {
    return this.commitmentMapperService.mapCommitmentsWithOccurrences(commitments, occurrences);
  }

  private calculateStatistics(data, totalCommitments: number, totalOccurrences: number) {
    const { totalPaidInMonth, totalPendingInMonth } = this.commitmentStatsService.calculateTotals(data);

    return {
      data,
      totalPaidInMonth,
      totalPendingInMonth,
      totalCommitments,
      totalOccurrences,
    };
  }

  private formatResponse(stats, month: number, year: number) {
    const formattedMonthYear = this.dateFormatterService.formatMonthYear(month, year);

    return {
      ...stats,
      formattedMonthYear,
    };
  }
}
