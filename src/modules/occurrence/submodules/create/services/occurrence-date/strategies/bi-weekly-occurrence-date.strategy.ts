import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

@Injectable()
export class BiWeeklyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    return startDate.plus({ weeks: occurrenceIndex * 2 });
  }

  getTotalOccurrences(): number {
    return 26; // Total de ocorrências em um ano
  }
}