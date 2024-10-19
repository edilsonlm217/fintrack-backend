import { Injectable } from '@nestjs/common';
import { OccurrenceDateService } from './submodules/occurrence-date/occurrence-date.service';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceFactory } from '../../factories/occurrence.factory';
import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';

@Injectable()
export class OccurrenceGenerationService {
  constructor(
    private readonly occurrenceDateService: OccurrenceDateService,
    private readonly occurrenceFactory: OccurrenceFactory
  ) { }

  generateInstallmentOccurrences(
    commitment: Commitment,
    baseInstallmentAmount: number,
    adjustmentAmount: number,
    remainingInstallments: number
  ): CreateOccurrenceDto[] {
    const occurrences: CreateOccurrenceDto[] = [];

    for (let i = 0; i < remainingInstallments; i++) {
      const occurrenceDate = this.occurrenceDateService.calculateOccurrenceDate({
        startDateString: commitment.due_date,
        occurrenceIndex: i,
        periodicity: commitment.periodicity
      }).toISODate();

      const installmentAmount = this.calculateInstallmentAmount(i, remainingInstallments, baseInstallmentAmount, adjustmentAmount);
      const occurrence = this.occurrenceFactory.createOccurrence(commitment, occurrenceDate, installmentAmount);

      occurrences.push(occurrence);
    }

    return occurrences;
  }

  // Novo método para compromissos recorrentes
  generateRecurringOccurrences(
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

      const occurrence = this.occurrenceFactory.createOccurrence(commitment, occurrenceDate, monthlyAmount);
      occurrences.push(occurrence);
    }

    return occurrences;
  }

  generateOneTimeOccurrence(commitment: Commitment) {
    return this.occurrenceFactory.createOccurrence(
      commitment,
      commitment.due_date,
      commitment.amount
    );
  }

  getTotalOccurrencesForPeriodicity(periodicity: CommitmentPeriodicity) {
    return this.occurrenceDateService.getTotalOccurrencesForPeriodicity(periodicity)
  }

  private calculateInstallmentAmount(
    index: number,
    remainingInstallments: number,
    baseInstallmentAmount: number,
    adjustmentAmount: number
  ): number {
    return baseInstallmentAmount + (index === remainingInstallments - 1 ? adjustmentAmount : 0);
  }
}
