import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';
import { OccurrenceDateStrategy } from './interfaces/occurrence-date.strategy';

import { WeeklyOccurrenceDateStrategy } from './strategies/weekly-occurrence-date.strategy';
import { BiWeeklyOccurrenceDateStrategy } from './strategies/bi-weekly-occurrence-date.strategy';
import { MonthlyOccurrenceDateStrategy } from './strategies/monthly-occurrence-date.strategy';
import { QuarterlyOccurrenceDateStrategy } from './strategies/quartely-occurrence-date.strategy';
import { YearlyOccurrenceDateStrategy } from './strategies/yearly-occurrence-date.strategy';

@Injectable()
export class OccurrenceDateService {
  private strategies: Record<CommitmentPeriodicity, OccurrenceDateStrategy>;

  constructor(
    private readonly weeklyStrategy: WeeklyOccurrenceDateStrategy,
    private readonly biWeeklyStrategy: BiWeeklyOccurrenceDateStrategy,
    private readonly monthlyStrategy: MonthlyOccurrenceDateStrategy,
    private readonly quarterlyStrategy: QuarterlyOccurrenceDateStrategy,
    private readonly yearlyStrategy: YearlyOccurrenceDateStrategy,
  ) {
    this.strategies = {
      [CommitmentPeriodicity.WEEKLY]: this.weeklyStrategy,
      [CommitmentPeriodicity.BIWEEKLY]: this.biWeeklyStrategy,
      [CommitmentPeriodicity.MONTHLY]: this.monthlyStrategy,
      [CommitmentPeriodicity.QUARTERLY]: this.quarterlyStrategy,
      [CommitmentPeriodicity.YEARLY]: this.yearlyStrategy,
    };
  }

  /**
   * Calculates the occurrence date based on the start date, occurrence index, and periodicity.
   * @param startDateString - Start date as an ISO string.
   * @param occurrenceIndex - Index of the occurrence (0-based).
   * @param periodicity - The periodicity of the commitment.
   * @returns Occurrence date.
   */
  calculateOccurrenceDate(
    startDateString: string,
    occurrenceIndex: number,
    periodicity: CommitmentPeriodicity
  ): DateTime {
    const startDate = DateTime.fromISO(startDateString).startOf('day');
    const strategy = this.strategies[periodicity];

    if (!strategy) {
      throw new Error('Unsupported periodicity');
    }

    return strategy.calculateOccurrenceDate(startDate, occurrenceIndex);
  }

  /**
   * Returns the total number of occurrences based on the periodicity.
   * @param periodicity - The periodicity of the commitment.
   * @returns Total occurrences.
   */
  getTotalOccurrencesForPeriodicity(periodicity: CommitmentPeriodicity): number {
    const strategy = this.strategies[periodicity];

    if (!strategy) {
      throw new Error('Unsupported periodicity');
    }

    return strategy.getTotalOccurrences();
  }
}
