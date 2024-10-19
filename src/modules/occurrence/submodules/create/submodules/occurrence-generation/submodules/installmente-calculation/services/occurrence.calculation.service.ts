import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { InstallmentHelper } from '../helpers/installment.helper';

@Injectable()
export class OccurrenceCalculationService {
  calculateBaseInstallmentAmount(commitment: Commitment): number {
    return InstallmentHelper.calculateBaseInstallmentAmount({
      totalAmount: commitment.amount,
      totalInstallments: commitment.installments,
    });
  }

  calculateAdjustmentAmount(commitment: Commitment, baseInstallmentAmount: number): number {
    return InstallmentHelper.calculateAdjustmentAmount({
      totalAmount: commitment.amount,
      baseInstallmentAmount: baseInstallmentAmount,
      totalInstallments: commitment.installments,
    });
  }

  calculateRemainingInstallments(commitment: Commitment): number {
    return InstallmentHelper.calculateRemainingInstallments({
      currentInstallment: commitment.current_installment,
      totalInstallments: commitment.installments,
    });
  }

  calculateInstallmentAmount(index: number, remainingInstallments: number, baseInstallmentAmount: number, adjustmentAmount: number): number {
    return InstallmentHelper.calculateInstallmentAmount({
      index,
      remainingInstallments,
      baseInstallmentAmount,
      adjustmentAmount,
    });
  }
}
