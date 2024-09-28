/**
 * Utilities for calculations and manipulations of financial occurrences.
 */
export class OccurrenceHelper {
  /**
   * Converts a date string "YYYY-MM-DD" to a Date object.
   * @param startDateString - Date string.
   * @returns Corresponding Date object.
   */
  static parseStartDate(startDateString: string): Date {
    const [year, month, day] = startDateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  /**
   * Calculates the base amount for each installment.
   * @param totalAmount - Total amount.
   * @param totalInstallments - Total number of installments.
   * @returns Base amount per installment (rounded).
   */
  static calculateBaseInstallmentAmount(totalAmount: number, totalInstallments: number): number {
    return Math.floor((totalAmount / totalInstallments) * 100) / 100;
  }

  /**
   * Calculates the adjustment amount to equal the total.
   * @param totalAmount - Total amount.
   * @param baseInstallmentAmount - Base amount of the installment.
   * @param totalInstallments - Total number of installments.
   * @returns Adjustment amount (rounded).
   */
  static calculateAdjustmentAmount(totalAmount: number, baseInstallmentAmount: number, totalInstallments: number): number {
    const totalCalculated = baseInstallmentAmount * totalInstallments;
    return Math.round((totalAmount - totalCalculated) * 100) / 100;
  }

  /**
   * Calculates the number of remaining installments.
   * @param currentInstallment - Index of the current installment.
   * @param totalInstallments - Total number of installments.
   * @returns Remaining installments.
   */
  static calculateRemainingInstallments(currentInstallment: number, totalInstallments: number): number {
    return totalInstallments - currentInstallment + 1;
  }

  /**
   * Calculates the occurrence date based on the start date and the installment index.
   * @param startDate - Start date.
   * @param installmentIndex - Index of the installment.
   * @returns Occurrence date.
   */
  static calculateOccurrenceDate(startDate: Date, installmentIndex: number): Date {
    const occurrenceDate = new Date(startDate.getTime());
    occurrenceDate.setUTCMonth(startDate.getUTCMonth() + installmentIndex);

    if (occurrenceDate.getUTCDate() !== startDate.getUTCDate() && occurrenceDate.getUTCDate() === 1) {
      occurrenceDate.setUTCMonth(occurrenceDate.getUTCMonth() + 1);
      occurrenceDate.setUTCDate(0);
    } else if (occurrenceDate.getUTCDate() !== startDate.getUTCDate()) {
      occurrenceDate.setUTCDate(0);
    }

    return occurrenceDate;
  }

  /**
   * Calculates the amount of the installment.
   * @param index - Index of the installment.
   * @param remainingInstallments - Remaining installments.
   * @param baseInstallmentAmount - Base amount of the installment.
   * @param adjustmentAmount - Adjustment amount.
   * @returns Calculated installment amount.
   */
  static calculateInstallmentAmount(index: number, remainingInstallments: number, baseInstallmentAmount: number, adjustmentAmount: number): number {
    return (index === remainingInstallments - 1) ? baseInstallmentAmount + adjustmentAmount : baseInstallmentAmount;
  }
}
