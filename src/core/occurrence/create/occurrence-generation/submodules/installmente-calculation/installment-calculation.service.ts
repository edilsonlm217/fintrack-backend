import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { OccurrenceCalculationService } from './services/occurrence.calculation.service';
import { InstallmentDetails } from './interfaces/installment-details.interface';
import { InstallmentCalculationParams } from './interfaces/installment-calculation-params.interface';

/**
 * Service for calculating installment details for commitments.
 * This service utilizes the OccurrenceCalculationService to compute
 * the base installment amount, adjustment amounts, and the number of remaining installments.
 */
@Injectable()
export class InstallmentCalculationService {
  constructor(private readonly occurrenceCalculationService: OccurrenceCalculationService) { }

  /**
   * Calculates the details of installments based on the given commitment.
   *
   * @param commitment - The commitment object containing relevant details for calculation.
   * @returns An InstallmentDetails object containing base installment amount,
   * adjustment amount, and the number of remaining installments.
   */
  calculateInstallmentDetails(commitment: Commitment): InstallmentDetails {
    const baseInstallmentAmount = this.occurrenceCalculationService.calculateBaseInstallmentAmount(commitment);
    const adjustmentAmount = this.occurrenceCalculationService.calculateAdjustmentAmount(commitment, baseInstallmentAmount);
    const remainingInstallments = this.occurrenceCalculationService.calculateRemainingInstallments(commitment);

    return { baseInstallmentAmount, adjustmentAmount, remainingInstallments };
  }

  /**
   * Calculates the amount for a specific installment based on the parameters provided.
   *
   * @param params - The parameters for calculating the installment amount, including:
   * - index: The index of the current installment (0-based).
   * - remainingInstallments: The total number of remaining installments.
   * - baseInstallmentAmount: The base amount for each installment.
   * - adjustmentAmount: The adjustment amount to be added to the final installment.
   * @returns The calculated installment amount.
   */
  calculateInstallmentAmount(params: InstallmentCalculationParams): number {
    const { index, remainingInstallments, baseInstallmentAmount, adjustmentAmount } = params;
    // Adds the adjustment only to the last installment.
    return baseInstallmentAmount + (index === remainingInstallments - 1 ? adjustmentAmount : 0);
  }
}
