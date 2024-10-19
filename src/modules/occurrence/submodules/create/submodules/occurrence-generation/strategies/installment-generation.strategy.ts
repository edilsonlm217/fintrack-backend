import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { InstallmentCalculationService } from '../submodules/installmente-calculation/installment-calculation.service';
import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';
import { OccurrenceFactory } from '../../../factories/occurrence.factory';

@Injectable()
export class InstallmentGenerationStrategy implements GenerationStrategy {
  constructor(
    private readonly installmentCalculationService: InstallmentCalculationService,
    private readonly occurrenceDateService: OccurrenceDateService,
    private readonly occurrenceFactory: OccurrenceFactory
  ) { }

  async process(commitment: Commitment): Promise<CreateOccurrenceDto[]> {
    const installmentDetails = this.installmentCalculationService.calculateInstallmentDetails(commitment);
    const { baseInstallmentAmount, adjustmentAmount, remainingInstallments } = installmentDetails;
    const occurrencesToCreate = this.generateInstallmentOccurrences(
      commitment,
      baseInstallmentAmount,
      adjustmentAmount,
      remainingInstallments
    );

    return occurrencesToCreate;
  }

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

  private calculateInstallmentAmount(
    index: number,
    remainingInstallments: number,
    baseInstallmentAmount: number,
    adjustmentAmount: number
  ): number {
    return baseInstallmentAmount + (index === remainingInstallments - 1 ? adjustmentAmount : 0);
  }
}
