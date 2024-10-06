/**
 * Interface for the parameters of the calculateBaseInstallmentAmount method.
 */
export interface CalculateBaseInstallmentAmountParams {
  /**
   * The total amount to be divided among the installments.
   */
  totalAmount: number;

  /**
   * The total number of installments.
   */
  totalInstallments: number;
}