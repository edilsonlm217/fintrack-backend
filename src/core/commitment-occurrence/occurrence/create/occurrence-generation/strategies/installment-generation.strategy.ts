import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { InstallmentCalculationService } from '../submodules/installmente-calculation/installment-calculation.service';
import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';
import { CreateOccurrenceDtoFactory } from '../../../../../../common/factories/create-occurrence-dto.factory';

/**
 * Strategy for generating occurrences for installment commitments.
 * This strategy calculates installment amounts and occurrence dates based on the commitment details.
 */
@Injectable()
export class InstallmentGenerationStrategy implements GenerationStrategy {
  constructor(
    private readonly installmentCalculationService: InstallmentCalculationService,
    private readonly occurrenceDateService: OccurrenceDateService,
  ) { }

  /**
   * Processes a commitment to generate an array of occurrence DTOs.
   *
   * @param commitment - The commitment object containing details such as due date, base installment amount, and periodicity.
   * @returns A promise that resolves to an array of CreateOccurrenceDto instances.
   */
  async process(commitment: Commitment): Promise<CreateOccurrenceDto[]> {
    const { baseInstallmentAmount, adjustmentAmount, remainingInstallments } =
      this.installmentCalculationService.calculateInstallmentDetails(commitment);

    return Array.from({ length: remainingInstallments }, (_, i) => {
      const occurrenceDate = this.occurrenceDateService
        .calculateOccurrenceDate({
          startDateString: commitment.due_date,
          occurrenceIndex: i,
          periodicity: commitment.periodicity,
        })
        .toISODate();

      const installmentAmount = this.installmentCalculationService.calculateInstallmentAmount({
        index: i,
        remainingInstallments,
        baseInstallmentAmount,
        adjustmentAmount
      });

      return CreateOccurrenceDtoFactory.createOccurrence(
        occurrenceDate,
        installmentAmount,
      );
    });
  }
}
