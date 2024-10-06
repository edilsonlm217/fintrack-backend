import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

@Injectable()
export class YearlyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    return startDate.plus({ years: occurrenceIndex });
  }

  getTotalOccurrences(): number {
    return 1; // Total de ocorrências em um ano
  }
}
