import { Injectable } from '@nestjs/common';

import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';

import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';
import { OccurrenceDateService } from '../services/occurrence-date/occurrence-date.service';

@Injectable()
export class RecurringOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrenceDateService: OccurrenceDateService,
    private readonly occurrenceRepository: OccurrenceRepository,
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const occurrences: CreateOccurrenceDto[] = [];
    const dueDate = commitment.due_date;
    const monthlyAmount = commitment.amount;
    const periodicity = commitment.periodicity;

    // Obter o número total de ocorrências com base na periodicidade
    const numberOfOccurrences = this.occurrenceDateService.getTotalOccurrencesForPeriodicity(periodicity);

    // Gerar ocorrências com base na periodicidade
    for (let i = 0; i < numberOfOccurrences; i++) {
      const occurrenceDate = this.occurrenceDateService.calculateOccurrenceDate(dueDate, i, periodicity);

      occurrences.push({
        commitment_id: commitment._id,
        due_date: occurrenceDate.toISODate(),
        amount: monthlyAmount,
        status: 'pendente',
      });
    }

    return this.occurrenceRepository.insertMany(occurrences);
  }
}
