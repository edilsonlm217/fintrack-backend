/**
 * Interface for the parameters of the calculateInstallmentAmount method.
 */
export interface CalculateInstallmentAmountParams {
  /**
   * The index of the installment (starting from 0).
   */
  index: number;

  /**
   * The number of remaining installments.
   */
  remainingInstallments: number;

  /**
   * The base amount of the installment.
   */
  baseInstallmentAmount: number;

  /**
   * The adjustment amount that should be added to the last installment.
   */
  adjustmentAmount: number;
}
