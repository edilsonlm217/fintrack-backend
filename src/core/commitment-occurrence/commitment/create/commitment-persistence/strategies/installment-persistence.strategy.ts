import { Injectable } from '@nestjs/common';
import { CommitmentPersistenceStrategy } from '../interfaces/commitment-persistence-strategy.interface';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentRepository } from 'src/database/neo4j/repositories/commitment.repository';

/**
 * Strategy for persisting installment-based financial commitments.
 * Implements the CommitmentPersistenceStrategy interface to define
 * how installment commitments should be stored in the database.
 */
@Injectable()
export class InstallmentPersistenceStrategy implements CommitmentPersistenceStrategy {
  constructor(private readonly commitmentRepository: CommitmentRepository) { }

  /**
   * Processes the creation of an installment financial commitment.
   * 
   * @param createCommitmentDto - Data Transfer Object (DTO) that contains the
   * information needed to create the commitment.
   * 
   * @returns A Promise that resolves to the created commitment stored in the database.
   */
  async process(createCommitmentDto: CreateCommitmentDto) {
    return this.commitmentRepository.insertOne({
      type: createCommitmentDto.type,
      description: createCommitmentDto.description,
      amount: createCommitmentDto.amount,
      periodicity: createCommitmentDto.periodicity,
      installments: createCommitmentDto.installments,
      current_installment: createCommitmentDto.current_installment,
      due_date: createCommitmentDto.due_date,
      category: createCommitmentDto.category,
      subcategory: createCommitmentDto.subcategory,
      user_id: createCommitmentDto.user_id,
    });
  }
}
