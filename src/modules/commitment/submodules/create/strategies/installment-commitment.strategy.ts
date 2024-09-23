import { Injectable } from '@nestjs/common';
import { CommitmentStrategy } from '../interfaces/create-strategy.interface';
import { CreateCommitmentDto } from 'src/modules/commitment/dto/create-commitment.dto';
import { CommitmentRepository } from 'src/database/repositories/commitment.repository';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

export interface Occurrence {
  commitment_id: string;
  due_date: string; // Formato ISO (YYYY-MM-DD)
  amount: number;
  status: 'pendente' | 'paga' | 'atrasada'; // Valores possíveis
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
    const startDate = this.parseStartDate(startDateString);
    const baseInstallmentAmount = this.calculateBaseInstallmentAmount(totalAmount, totalInstallments);
    const adjustmentAmount = this.calculateAdjustmentAmount(totalAmount, baseInstallmentAmount, totalInstallments);

    const remainingInstallments = this.calculateRemainingInstallments(currentInstallment, totalInstallments);

    for (let i = 0; i < remainingInstallments; i++) {
      const occurrenceDate = this.calculateOccurrenceDate(startDate, i);
      const installmentAmount = this.calculateInstallmentAmount(i, remainingInstallments, baseInstallmentAmount, adjustmentAmount);

      occurrences.push({
        commitment_id: commitmentId,
        due_date: occurrenceDate.toISOString().split('T')[0],
        amount: installmentAmount,
        status: 'pendente',
      });
    }

    console.log("occurrences", occurrences);
    return occurrences;
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
    occurrenceDate.setUTCMonth(startDate.getUTCMonth() + installmentIndex); // Incrementa o mês

    // Ajuste para o último dia do mês
    if (occurrenceDate.getUTCDate() !== startDate.getUTCDate() && occurrenceDate.getUTCDate() === 1) {
      occurrenceDate.setUTCMonth(occurrenceDate.getUTCMonth() + 1);
      occurrenceDate.setUTCDate(0); // Último dia do mês anterior
    } else if (occurrenceDate.getUTCDate() !== startDate.getUTCDate()) {
      occurrenceDate.setUTCDate(0); // Último dia do mês anterior
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
