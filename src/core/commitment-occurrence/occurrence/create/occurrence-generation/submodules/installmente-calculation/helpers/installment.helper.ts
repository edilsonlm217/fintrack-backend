import { Injectable } from '@nestjs/common';

import { CalculateBaseInstallmentAmountParams } from '../interfaces/calculate-base-installment-amount-params.interface';
import { CalculateAdjustmentAmountParams } from '../interfaces/calculate-adjustment-amount-params.interface';
import { CalculateRemainingInstallmentsParams } from '../interfaces/calculate-remaining-installments-params.interface';
import { CalculateInstallmentAmountParams } from '../interfaces/calculate-installment-amount-params.interface';

/**
 * A utility class for calculating various installment-related amounts.
 * This class provides static methods to calculate base installment amounts,
 * adjustment amounts, remaining installments, and the final installment amount.
 */
@Injectable()
export class InstallmentHelper {
  /**
   * Calculates the base installment amount based on the total amount and the total number of installments.
   * The base installment amount is rounded down to two decimal places.
   *
   * @param params - An object containing totalAmount and totalInstallments.
   * @returns The base installment amount rounded to two decimal places.
   */
  static calculateBaseInstallmentAmount(params: CalculateBaseInstallmentAmountParams): number {
    const { totalAmount, totalInstallments } = params;
    return Math.floor((totalAmount / totalInstallments) * 100) / 100;
  }

  /**
   * Calculates the adjustment amount needed to balance the total amount with the calculated installments.
   * The adjustment amount is rounded to two decimal places.
   *
   * @param params - An object containing totalAmount, baseInstallmentAmount, and totalInstallments.
   * @returns The adjustment amount to balance the total installments to the total amount.
   */
  static calculateAdjustmentAmount(params: CalculateAdjustmentAmountParams): number {
    const { totalAmount, baseInstallmentAmount, totalInstallments } = params;
    const totalCalculated = baseInstallmentAmount * totalInstallments;
    return Math.round((totalAmount - totalCalculated) * 100) / 100;
  }

  /**
   * Calculates the number of remaining installments.
   *
   * @param params - An object containing currentInstallment and totalInstallments.
   * @returns The number of remaining installments.
   */
  static calculateRemainingInstallments(params: CalculateRemainingInstallmentsParams): number {
    const { currentInstallment, totalInstallments } = params;
    return totalInstallments - currentInstallment + 1;
  }

  /**
   * Calculates the final installment amount based on the index of the installment,
   * the number of remaining installments, the base installment amount, and the adjustment amount.
   * The last installment includes the adjustment amount.
   *
   * @param params - An object containing index, remainingInstallments, baseInstallmentAmount, and adjustmentAmount.
   * @returns The calculated installment amount for the given index.
   */
  static calculateInstallmentAmount(params: CalculateInstallmentAmountParams): number {
    const { index, remainingInstallments, baseInstallmentAmount, adjustmentAmount } = params;
    return (index === remainingInstallments - 1) ? baseInstallmentAmount + adjustmentAmount : baseInstallmentAmount;
  }
}
