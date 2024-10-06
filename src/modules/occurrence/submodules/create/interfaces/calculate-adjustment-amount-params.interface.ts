/**
 * Interface for the parameters of the calculateAdjustmentAmount method.
 */
export interface CalculateAdjustmentAmountParams {
  /**
   * The total amount that should be adjusted to equal the total of the installments.
   */
  totalAmount: number;

  /**
   * The base amount of each installment that has been calculated.
   */
  baseInstallmentAmount: number;

  /**
   * The total number of installments.
   */
  totalInstallments: number;
}