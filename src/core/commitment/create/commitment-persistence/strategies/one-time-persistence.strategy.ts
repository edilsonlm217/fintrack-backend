import { Injectable } from '@nestjs/common';
import { CommitmentPersistenceStrategy } from '../interfaces/commitment-persistence-strategy.interface';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentRepository } from 'src/database/repositories/commitment.repository';

/**
 * Strategy for persisting one-time financial commitments.
 * Implements the CommitmentPersistenceStrategy interface to define
 * how one-time commitments should be stored in the database.
 */
@Injectable()
export class OneTimePersistenceStrategy implements CommitmentPersistenceStrategy {
  constructor(private readonly commitmentRepository: CommitmentRepository) { }

  /**
   * Processes the creation of a one-time financial commitment.
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
      due_date: createCommitmentDto.due_date,
      category: createCommitmentDto.category,
      subcategory: createCommitmentDto.subcategory,
    });
  }
}
