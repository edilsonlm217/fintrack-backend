import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CreateOccurrenceDto } from '../commitment/dto/create-occurrence.dto';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

@Injectable()
export class OccurrenceService {
  constructor(private readonly occurrenceRepository: OccurrenceRepository) { }

  async create(commitment: Commitment): Promise<Occurrence[]> {
    const occurrences: CreateOccurrenceDto[] = [];
    const startDate = this.parseStartDate(commitment.start_date);
    const baseInstallmentAmount = this.calculateBaseInstallmentAmount(commitment.amount, commitment.installments);
    const adjustmentAmount = this.calculateAdjustmentAmount(commitment.amount, baseInstallmentAmount, commitment.installments);

    const remainingInstallments = this.calculateRemainingInstallments(commitment.current_installment, commitment.installments);

    for (let i = 0; i < remainingInstallments; i++) {
      const occurrenceDate = this.calculateOccurrenceDate(startDate, i);
      const installmentAmount = this.calculateInstallmentAmount(i, remainingInstallments, baseInstallmentAmount, adjustmentAmount);

      occurrences.push({
        commitment_id: commitment._id,
        due_date: occurrenceDate.toISOString().split('T')[0],
        amount: installmentAmount,
        status: 'pendente',
      });
    }

    const insertedOccurrences = await this.occurrenceRepository.insertMany(occurrences);
    return insertedOccurrences;
  }

  private parseStartDate(startDateString: string): Date {
    const [year, month, day] = startDateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  private calculateBaseInstallmentAmount(totalAmount: number, totalInstallments: number): number {
    return Math.floor((totalAmount / totalInstallments) * 100) / 100;
  }

  private calculateAdjustmentAmount(totalAmount: number, baseInstallmentAmount: number, totalInstallments: number): number {
    const totalCalculated = baseInstallmentAmount * totalInstallments;
    return Math.round((totalAmount - totalCalculated) * 100) / 100;
  }

  private calculateRemainingInstallments(currentInstallment: number, totalInstallments: number): number {
    return totalInstallments - currentInstallment + 1;
  }

  private calculateOccurrenceDate(startDate: Date, installmentIndex: number): Date {
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

  private calculateInstallmentAmount(
    index: number,
    remainingInstallments: number,
    baseInstallmentAmount: number,
    adjustmentAmount: number
  ): number {
    return (index === remainingInstallments - 1) ? baseInstallmentAmount + adjustmentAmount : baseInstallmentAmount;
  }
}
