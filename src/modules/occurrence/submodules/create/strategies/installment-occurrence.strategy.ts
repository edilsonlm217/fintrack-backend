import { Injectable } from '@nestjs/common';
import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceHelper } from 'src/modules/occurrence/occurrence.helper';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

@Injectable()
export class InstallmentOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrenceRepository: OccurrenceRepository
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const occurrences: CreateOccurrenceDto[] = [];
    const dueDate = commitment.due_date;

    const baseInstallmentAmount = OccurrenceHelper.calculateBaseInstallmentAmount(commitment.amount, commitment.installments);
    const adjustmentAmount = OccurrenceHelper.calculateAdjustmentAmount(commitment.amount, baseInstallmentAmount, commitment.installments);
    const remainingInstallments = OccurrenceHelper.calculateRemainingInstallments(commitment.current_installment, commitment.installments);

    // Supondo que a periodicidade esteja definida no compromisso
    const periodicity = commitment.periodicity;

    for (let i = 0; i < remainingInstallments; i++) {
      // Passando a periodicidade como argumento
      const occurrenceDate = OccurrenceHelper.calculateOccurrenceDate(dueDate, i, periodicity);
      const installmentAmount = OccurrenceHelper.calculateInstallmentAmount(i, remainingInstallments, baseInstallmentAmount, adjustmentAmount);

      occurrences.push({
        commitment_id: commitment._id,
        due_date: occurrenceDate.toISODate(),
        amount: installmentAmount,
        status: 'pendente',
      });
    }

    return this.occurrenceRepository.insertMany(occurrences);
  }
}
