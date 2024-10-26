import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { InstallmentHelper } from '../helpers/installment.helper';

/**
 * Service for calculating installment-related amounts for commitments.
 * This service leverages the InstallmentHelper to perform various calculations
 * regarding installments, including base amounts, adjustments, and remaining installments.
 */
@Injectable()
export class OccurrenceCalculationService {
  /**
   * Calculates the base installment amount for a given commitment.
   *
   * @param commitment - The commitment object containing total amount and total installments.
   * @returns The calculated base installment amount.
   */
  calculateBaseInstallmentAmount(commitment: Commitment): number {
    return InstallmentHelper.calculateBaseInstallmentAmount({
      totalAmount: commitment.amount,
      totalInstallments: commitment.installments,
    });
  }

  /**
   * Calculates the adjustment amount based on the commitment details.
   *
   * @param commitment - The commitment object containing total amount and total installments.
   * @param baseInstallmentAmount - The base installment amount to be used for adjustment calculation.
   * @returns The calculated adjustment amount.
   */
  calculateAdjustmentAmount(commitment: Commitment, baseInstallmentAmount: number): number {
    return InstallmentHelper.calculateAdjustmentAmount({
      totalAmount: commitment.amount,
      baseInstallmentAmount: baseInstallmentAmount,
      totalInstallments: commitment.installments,
    });
  }

  /**
   * Calculates the number of remaining installments for a given commitment.
   *
   * @param commitment - The commitment object containing current installment and total installments.
   * @returns The number of remaining installments.
   */
  calculateRemainingInstallments(commitment: Commitment): number {
    return InstallmentHelper.calculateRemainingInstallments({
      currentInstallment: commitment.current_installment,
      totalInstallments: commitment.installments,
    });
  }

  /**
   * Calculates the amount for a specific installment.
   *
   * @param index - The index of the current installment (0-based).
   * @param remainingInstallments - The total number of remaining installments.
   * @param baseInstallmentAmount - The base amount for each installment.
   * @param adjustmentAmount - The adjustment amount to be added to the installment.
   * @returns The calculated installment amount.
   */
  calculateInstallmentAmount(index: number, remainingInstallments: number, baseInstallmentAmount: number, adjustmentAmount: number): number {
    return InstallmentHelper.calculateInstallmentAmount({
      index,
      remainingInstallments,
      baseInstallmentAmount,
      adjustmentAmount,
    });
  }
}
