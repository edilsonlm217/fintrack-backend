import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';  // Importando a função para gerar UUID
import { CommitmentPersistenceStrategy } from '../interfaces/commitment-persistence-strategy.interface';
import { CreateCommitmentRequestDto } from 'src/modules/commitment/interfaces/create-commitment-request.dto';
import { CommitmentRepository } from 'src/database/neo4j/repositories/commitment.repository';

/**
 * Strategy for persisting recurring financial commitments.
 * Implements the CommitmentPersistenceStrategy interface to define
 * how recurring commitments should be stored in the database.
 */
@Injectable()
export class RecurringPersistenceStrategy implements CommitmentPersistenceStrategy {
  constructor(private readonly commitmentRepository: CommitmentRepository) { }

  /**
   * Processes the creation of a recurring financial commitment.
   * 
   * @param createCommitmentDto - Data Transfer Object (DTO) that contains the
   * information needed to create the recurring commitment.
   * 
   * @returns A Promise that resolves to the created commitment stored in the database.
   */
  async process(createCommitmentRequestDto: CreateCommitmentRequestDto) {
    const userId = createCommitmentRequestDto.user_id;
    return this.commitmentRepository.insertOne(userId, {
      id: uuidv4(),
      type: createCommitmentRequestDto.type,
      description: createCommitmentRequestDto.description,
      amount: createCommitmentRequestDto.amount,
      periodicity: createCommitmentRequestDto.periodicity,
      due_date: createCommitmentRequestDto.due_date,
      category: createCommitmentRequestDto.category,
      subcategory: createCommitmentRequestDto.subcategory
    });
  }
}
