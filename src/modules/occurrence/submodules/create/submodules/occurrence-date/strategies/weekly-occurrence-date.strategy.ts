import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

@Injectable()
export class WeeklyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    return startDate.plus({ weeks: occurrenceIndex });
  }

  getTotalOccurrences(): number {
    return 52; // Total de ocorrências em um ano
  }
}