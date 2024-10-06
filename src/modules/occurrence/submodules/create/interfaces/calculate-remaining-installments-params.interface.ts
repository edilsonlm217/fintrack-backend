/**
 * Interface for the parameters of the calculateRemainingInstallments method.
 */
export interface CalculateRemainingInstallmentsParams {
  /**
   * The index of the current installment (starting from 1).
   */
  currentInstallment: number;

  /**
   * The total number of installments.
   */
  totalInstallments: number;
}