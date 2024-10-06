import { Injectable } from '@nestjs/common';
import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';
import { InstallmentHelper } from '../helpers/installment.helper';
import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';

@Injectable()
export class InstallmentOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrenceDateService: OccurrenceDateService,
    private readonly occurrenceRepository: OccurrenceRepository,
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const occurrences: CreateOccurrenceDto[] = [];
    const dueDate = commitment.due_date;

    const baseInstallmentAmount = InstallmentHelper.calculateBaseInstallmentAmount({
      totalAmount: commitment.amount,
      totalInstallments: commitment.installments
    });

    const adjustmentAmount = InstallmentHelper.calculateAdjustmentAmount({
      totalAmount: commitment.amount,
      baseInstallmentAmount: baseInstallmentAmount,
      totalInstallments: commitment.installments
    });

    const remainingInstallments = InstallmentHelper.calculateRemainingInstallments({
      currentInstallment: commitment.current_installment,
      totalInstallments: commitment.installments
    });

    // Supondo que a periodicidade esteja definida no compromisso
    const periodicity = commitment.periodicity;

    for (let i = 0; i < remainingInstallments; i++) {
      // Passando a periodicidade como argumento
      const occurrenceDate = this.occurrenceDateService.calculateOccurrenceDate({
        startDateString: dueDate,
        occurrenceIndex: i,
        periodicity
      });

      const installmentAmount = InstallmentHelper.calculateInstallmentAmount({
        index: i,
        remainingInstallments,
        baseInstallmentAmount,
        adjustmentAmount
      });

      occurrences.push({
        commitment_id: commitment._id,
        due_date: occurrenceDate.toISODate(),
        amount: installmentAmount,
        status: OccurrenceStatus.PENDING,
      });
    }

    return this.occurrenceRepository.insertMany(occurrences);
  }
}
