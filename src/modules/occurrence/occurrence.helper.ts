import { DateTime } from 'luxon';
import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';

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
   * Calculates the occurrence date based on the start date, installment index, and periodicity.
   * @param startDateString - Start date as an ISO string.
   * @param installmentIndex - Index of the installment (0-based).
   * @param periodicity - The periodicity of the commitment.
   * @returns Occurrence date.
   */
  static calculateOccurrenceDate(startDateString: string, installmentIndex: number, periodicity: CommitmentPeriodicity): DateTime {
    // Convert the start date string to a DateTime object
    let startDate = DateTime.fromISO(startDateString).startOf('day');

    let occurrenceDate: DateTime;

    switch (periodicity) {
      case CommitmentPeriodicity.WEEKLY:
        occurrenceDate = startDate.plus({ weeks: installmentIndex });
        break;
      case CommitmentPeriodicity.BIWEEKLY:
        occurrenceDate = startDate.plus({ weeks: installmentIndex * 2 });
        break;
      case CommitmentPeriodicity.MONTHLY:
        occurrenceDate = startDate.plus({ months: installmentIndex });
        break;
      case CommitmentPeriodicity.QUARTERLY:
        occurrenceDate = startDate.plus({ months: installmentIndex * 3 });
        break;
      case CommitmentPeriodicity.YEARLY:
        occurrenceDate = startDate.plus({ years: installmentIndex });
        break;
      default:
        throw new Error('Unsupported periodicity');
    }

    // Ensure that the occurrence date does not fall on the same day of the month when using monthly periodicity
    if (periodicity === CommitmentPeriodicity.MONTHLY && occurrenceDate.day !== startDate.day) {
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

  /**
   * Retorna o número total de ocorrências que devem ser geradas com base na periodicidade.
   * @param periodicity - A periodicidade do compromisso.
   * @returns O número total de ocorrências.
   */
  static getTotalOccurrencesForPeriodicity(periodicity: CommitmentPeriodicity): number {
    switch (periodicity) {
      case CommitmentPeriodicity.WEEKLY:
        return 52; // Compromissos semanais geram 52 ocorrências em um ano

      case CommitmentPeriodicity.BIWEEKLY:
        return 26; // Compromissos quinzenais geram 26 ocorrências em um ano

      case CommitmentPeriodicity.MONTHLY:
        return 12; // Compromissos mensais geram 12 ocorrências

      case CommitmentPeriodicity.QUARTERLY:
        return 4; // Compromissos trimestrais geram 4 ocorrências em um ano

      case CommitmentPeriodicity.YEARLY:
        return 1; // Compromissos anuais geram 1 ocorrência por ano

      default:
        throw new Error('Unsupported periodicity');
    }
  }
}
