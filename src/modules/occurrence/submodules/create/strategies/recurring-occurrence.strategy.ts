import { Injectable } from '@nestjs/common';

import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';

import { OccurrenceHelper } from 'src/modules/occurrence/occurrence.helper';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

@Injectable()
export class RecurringOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrenceRepository: OccurrenceRepository
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const occurrences: CreateOccurrenceDto[] = [];
    const dueDate = commitment.due_date;
    const monthlyAmount = commitment.amount;
    const periodicity = commitment.periodicity;

    // Obter o número total de ocorrências com base na periodicidade
    const numberOfOccurrences = OccurrenceHelper.getTotalOccurrencesForPeriodicity(periodicity);

    // Gerar ocorrências com base na periodicidade
    for (let i = 0; i < numberOfOccurrences; i++) {
      const occurrenceDate = OccurrenceHelper.calculateOccurrenceDate(dueDate, i, periodicity);

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
