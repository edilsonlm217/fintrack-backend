import { DateTime } from 'luxon';

/**
 * Utilities for calculations and manipulations of financial occurrences.
 */
export class OccurrenceHelper {
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
  static calculateOccurrenceDate(startDateString: string, installmentIndex: number): DateTime {
    // Converte a string de data de início para um objeto DateTime
    let startDate = DateTime.fromISO(startDateString).startOf('day');

    // Adiciona o número de meses correspondente ao índice da parcela
    let occurrenceDate = startDate.plus({ months: installmentIndex });

    // Verifica se o dia do mês mudou devido à diferença de duração entre meses
    if (occurrenceDate.day !== startDate.day) {
      occurrenceDate = occurrenceDate.endOf('month');
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
