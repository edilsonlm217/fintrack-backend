import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { WeeklyOccurrenceDateStrategy } from './strategies/weekly-occurrence-date.strategy';
import { BiWeeklyOccurrenceDateStrategy } from './strategies/bi-weekly-occurrence-date.strategy';
import { MonthlyOccurrenceDateStrategy } from './strategies/monthly-occurrence-date.strategy';
import { QuarterlyOccurrenceDateStrategy } from './strategies/quartely-occurrence-date.strategy';
import { YearlyOccurrenceDateStrategy } from './strategies/yearly-occurrence-date.strategy';

import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';
import { OccurrenceDateStrategy } from './interfaces/occurrence-date.strategy';
import { CalculateOccurrenceDateParams } from '../../../../interfaces/calculate-occurrence-date.params.interface';

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

  calculateOccurrenceDate(params: CalculateOccurrenceDateParams): DateTime {
    const { startDateString, periodicity, occurrenceIndex } = params;
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
