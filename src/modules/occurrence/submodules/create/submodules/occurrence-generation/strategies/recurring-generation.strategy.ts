import { Injectable } from '@nestjs/common';

import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';
import { CreateOccurrenceDtoFactory } from '../../../../../../../common/factories/create-occurrence-dto.factory';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';
import { RecurringDetails } from '../interfaces/recurring-details.interface';

@Injectable()
export class RecurringGenerationStrategy implements GenerationStrategy {
  constructor(
    private readonly occurrenceDateService: OccurrenceDateService,
  ) { }

  async process(commitment: Commitment): Promise<CreateOccurrenceDto[]> {
    const recurringDetails = this.getRecurringDetails(commitment);
    const { dueDate, monthlyAmount, numberOfOccurrences, periodicity } = recurringDetails;
    const occurrences = this.generateRecurringOccurrences(commitment, dueDate, monthlyAmount, periodicity, numberOfOccurrences);
    return occurrences;
  }

  private getRecurringDetails(commitment: Commitment): RecurringDetails {
    const dueDate = commitment.due_date;
    const monthlyAmount = commitment.amount;
    const periodicity = commitment.periodicity;
    const numberOfOccurrences = this.getTotalOccurrencesForPeriodicity(periodicity);

    return { dueDate, monthlyAmount, periodicity, numberOfOccurrences };
  }

  private getTotalOccurrencesForPeriodicity(periodicity: CommitmentPeriodicity) {
    return this.occurrenceDateService.getTotalOccurrencesForPeriodicity(periodicity)
  }

  private generateRecurringOccurrences(
    commitment: Commitment,
    dueDate: string,
    monthlyAmount: number,
    periodicity: CommitmentPeriodicity,
    numberOfOccurrences: number
  ): CreateOccurrenceDto[] {
    const occurrences: CreateOccurrenceDto[] = [];

    // Gerar ocorrências com base na periodicidade
    for (let i = 0; i < numberOfOccurrences; i++) {
      const occurrenceDate = this.occurrenceDateService.calculateOccurrenceDate({
        startDateString: dueDate,
        occurrenceIndex: i,
        periodicity
      }).toISODate();

      const occurrence = CreateOccurrenceDtoFactory.createOccurrence(commitment, occurrenceDate, monthlyAmount);
      occurrences.push(occurrence);
    }

    return occurrences;
  }
}
