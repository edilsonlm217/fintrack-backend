import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { InstallmentCalculationService } from '../submodules/installmente-calculation/installment-calculation.service';
import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';
import { CreateOccurrenceDtoFactory } from '../../../../../../../common/factories/create-occurrence-dto.factory';

@Injectable()
export class InstallmentGenerationStrategy implements GenerationStrategy {
  constructor(
    private readonly installmentCalculationService: InstallmentCalculationService,
    private readonly occurrenceDateService: OccurrenceDateService,
  ) { }

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
        commitment,
        occurrenceDate,
        installmentAmount,
      );
    });
  }
}
