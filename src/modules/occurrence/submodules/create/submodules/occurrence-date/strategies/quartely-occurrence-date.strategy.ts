import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

@Injectable()
export class QuarterlyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    return startDate.plus({ months: occurrenceIndex * 3 });
  }

  getTotalOccurrences(): number {
    return 4; // Total de ocorrências em um ano
  }
}
