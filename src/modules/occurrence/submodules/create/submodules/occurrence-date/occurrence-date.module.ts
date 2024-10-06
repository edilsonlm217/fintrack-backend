import { Module } from '@nestjs/common';
import { OccurrenceDateService } from './occurrence-date.service';
import { BiWeeklyOccurrenceDateStrategy } from './strategies/bi-weekly-occurrence-date.strategy';
import { MonthlyOccurrenceDateStrategy } from './strategies/monthly-occurrence-date.strategy';
import { QuarterlyOccurrenceDateStrategy } from './strategies/quartely-occurrence-date.strategy';
import { WeeklyOccurrenceDateStrategy } from './strategies/weekly-occurrence-date.strategy';
import { YearlyOccurrenceDateStrategy } from './strategies/yearly-occurrence-date.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [
    OccurrenceDateService,
    BiWeeklyOccurrenceDateStrategy,
    MonthlyOccurrenceDateStrategy,
    QuarterlyOccurrenceDateStrategy,
    WeeklyOccurrenceDateStrategy,
    YearlyOccurrenceDateStrategy,
  ],
  exports: [OccurrenceDateService]
})
export class OccurrenceDateModule { }
