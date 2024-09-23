import { Injectable } from '@nestjs/common';
import { CommitmentStrategy } from '../interfaces/create-strategy.interface';
import { CreateCommitmentDto } from 'src/modules/commitment/dto/create-commitment.dto';
import { CommitmentRepository } from 'src/database/repositories/commitment.repository';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

export interface Occurrence {
  commitment_id: string;
  due_date: string;  // Formato ISO (YYYY-MM-DD)
  amount: number;
  status: 'pendente' | 'paga' | 'atrasada';  // Valores possíveis
}

@Injectable()
export class InstallmentCommitmentStrategy implements CommitmentStrategy {
  constructor(
    private readonly commitmentRepository: CommitmentRepository,
    private readonly occurrenceRepository: OccurrenceRepository,
  ) { }

  async process(createCommitmentDto: CreateCommitmentDto) {
    const commitment = await this.commitmentRepository.insertOne({
      type: createCommitmentDto.type,
      description: createCommitmentDto.description,
      amount: createCommitmentDto.amount,
      installments: createCommitmentDto.installments,
      current_installment: createCommitmentDto.current_installment,
      start_date: createCommitmentDto.start_date,
      end_date: createCommitmentDto.end_date,
      category: createCommitmentDto.category,
      subcategory: createCommitmentDto.subcategory,
    });

    const occurrences = this.generateOccurrences(
      commitment._id,
      createCommitmentDto.start_date,
      createCommitmentDto.installments,
      createCommitmentDto.current_installment,
      createCommitmentDto.amount,
    );

    await this.occurrenceRepository.insertMany(occurrences);

    return commitment;
  }

  private generateOccurrences(
    commitmentId: string,
    startDateString: string,
    totalInstallments: number,
    currentInstallment: number,
    totalAmount: number
  ): Occurrence[] {
    const occurrences: Occurrence[] = [];

    const startDateParts = startDateString.split('-');
    const startDate = new Date(Date.UTC(
      parseInt(startDateParts[0]),
      parseInt(startDateParts[1]) - 1,
      parseInt(startDateParts[2])
    ));

    const baseInstallmentAmount = Math.floor((totalAmount / totalInstallments) * 100) / 100;
    const totalCalculated = baseInstallmentAmount * totalInstallments;
    const adjustment = Math.round((totalAmount - totalCalculated) * 100) / 100;

    // Lógica para quando currentInstallment é igual a 1
    if (currentInstallment === 1) {
      for (let i = 0; i < totalInstallments; i++) {
        let occurrenceDate = new Date(startDate.getTime());
        occurrenceDate.setUTCMonth(startDate.getUTCMonth() + i); // Incrementa o mês

        // Ajuste para o último dia do mês
        if (occurrenceDate.getUTCDate() !== startDate.getUTCDate() && occurrenceDate.getUTCDate() === 1) {
          occurrenceDate.setUTCMonth(occurrenceDate.getUTCMonth() + 1);
          occurrenceDate.setUTCDate(0);
        } else if (occurrenceDate.getUTCDate() !== startDate.getUTCDate()) {
          occurrenceDate.setUTCDate(0);
        }

        const formattedDate = occurrenceDate.toISOString().split('T')[0];
        const installmentAmount = (i === totalInstallments - 1) ? baseInstallmentAmount + adjustment : baseInstallmentAmount;

        occurrences.push({
          commitment_id: commitmentId,
          due_date: formattedDate,
          amount: installmentAmount,
          status: 'pendente',
        });
      }
    } else {
      // Lógica para quando currentInstallment é maior que 1
      const remainingInstallments = totalInstallments - currentInstallment + 1;

      for (let i = 0; i < remainingInstallments; i++) {
        let occurrenceDate = new Date(startDate.getTime());
        occurrenceDate.setUTCMonth(startDate.getUTCMonth() + i); // Incrementa o mês

        // Ajuste para o último dia do mês
        if (occurrenceDate.getUTCDate() !== startDate.getUTCDate() && occurrenceDate.getUTCDate() === 1) {
          occurrenceDate.setUTCMonth(occurrenceDate.getUTCMonth() + 1);
          occurrenceDate.setUTCDate(0);
        } else if (occurrenceDate.getUTCDate() !== startDate.getUTCDate()) {
          occurrenceDate.setUTCDate(0);
        }

        const formattedDate = occurrenceDate.toISOString().split('T')[0];
        const installmentAmount = (i === remainingInstallments - 1) ? baseInstallmentAmount + adjustment : baseInstallmentAmount;

        occurrences.push({
          commitment_id: commitmentId,
          due_date: formattedDate,
          amount: installmentAmount,
          status: 'pendente',
        });
      }
    }

    console.log("occurrences", occurrences);
    return occurrences;
  }
}
