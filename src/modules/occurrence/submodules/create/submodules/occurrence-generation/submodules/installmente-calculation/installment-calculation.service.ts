import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { OccurrenceCalculationService } from './services/occurrence.calculation.service';
import { InstallmentDetails } from './interfaces/installment-details.interface';
import { InstallmentCalculationParams } from './interfaces/installment-calculation-params.interface';

@Injectable()
export class InstallmentCalculationService {
  constructor(private readonly occurrenceCalculationService: OccurrenceCalculationService) { }

  calculateInstallmentDetails(commitment: Commitment): InstallmentDetails {
    const baseInstallmentAmount = this.occurrenceCalculationService.calculateBaseInstallmentAmount(commitment);
    const adjustmentAmount = this.occurrenceCalculationService.calculateAdjustmentAmount(commitment, baseInstallmentAmount);
    const remainingInstallments = this.occurrenceCalculationService.calculateRemainingInstallments(commitment);

    return { baseInstallmentAmount, adjustmentAmount, remainingInstallments };
  }

  calculateInstallmentAmount(params: InstallmentCalculationParams): number {
    const { index, remainingInstallments, baseInstallmentAmount, adjustmentAmount } = params;
    // Adiciona o ajuste apenas na última parcela.
    return baseInstallmentAmount + (index === remainingInstallments - 1 ? adjustmentAmount : 0);
  }
}
