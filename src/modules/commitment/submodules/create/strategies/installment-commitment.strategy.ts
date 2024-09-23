import { Injectable } from '@nestjs/common';

import { CommitmentStrategy } from '../interfaces/create-strategy.interface';
import { CreateCommitmentDto } from 'src/modules/commitment/dto/create-commitment.dto';
import { CommitmentRepository } from 'src/database/repositories/commitment.repository';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

@Injectable()
export class InstallmentCommitmentStrategy implements CommitmentStrategy {
  constructor(
    private readonly commitmentRepository: CommitmentRepository,
    private readonly occurrenceRepository: OccurrenceRepository,
  ) { }

  async process(createCommitmentDto: CreateCommitmentDto) {
    // Criação do compromisso no banco de dados
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

    // Gerar as ocorrências para as parcelas restantes
    const occurrences = this.generateOccurrences(
      commitment._id,
      createCommitmentDto.start_date,
      createCommitmentDto.installments,
      createCommitmentDto.current_installment,
      createCommitmentDto.amount,
    );

    // Salvar as ocorrências no banco de dados
    await this.occurrenceRepository.insertMany(occurrences);

    return commitment;
  }

  private generateOccurrences(
    commitmentId: string,
    startDateString: string,
    totalInstallments: number,
    currentInstallment: number,
    totalAmount: number
  ) {
    const occurrences = [];

    const startDateParts = startDateString.split('-');
    const startDate = new Date(Date.UTC(
      parseInt(startDateParts[0]), // ano
      parseInt(startDateParts[1]) - 1, // mês (0-11)
      parseInt(startDateParts[2]) // dia
    ));

    const dayOfMonth = startDate.getUTCDate();
    const baseInstallmentAmount = Math.floor((totalAmount / totalInstallments) * 100) / 100;
    const totalCalculated = baseInstallmentAmount * totalInstallments;
    const adjustment = Math.round((totalAmount - totalCalculated) * 100) / 100;

    for (let i = 0; i < totalInstallments; i++) {
      const occurrenceDate = new Date(startDate.getTime());
      occurrenceDate.setUTCMonth(startDate.getUTCMonth() + i);
      occurrenceDate.setUTCDate(dayOfMonth);

      if (occurrenceDate.getUTCMonth() !== (startDate.getUTCMonth() + i) % 12) {
        occurrenceDate.setUTCMonth(occurrenceDate.getUTCMonth() + 1);
        occurrenceDate.setUTCDate(dayOfMonth);
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

    return occurrences;
  }
}
