import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

@Injectable()
export class MonthlyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    let occurrenceDate = startDate.plus({ months: occurrenceIndex });
    // Ajuste para o final do mês, se necessário
    if (occurrenceDate.day !== startDate.day) {
      occurrenceDate = occurrenceDate.endOf('month');
    }
    return occurrenceDate;
  }

  getTotalOccurrences(): number {
    return 12; // Total de ocorrências em um ano
  }
}
