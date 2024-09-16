import { Injectable } from '@nestjs/common';
import { CommitmentStrategy } from '../interfaces/create-strategy.interface';
import { CreateCommitmentDto } from 'src/modules/commitment/dto/create-commitment.dto';
import { CommitmentRepository } from 'src/database/repositories/commitment.repository';

@Injectable()
export class PlannedCommitmentStrategy implements CommitmentStrategy {
  constructor(private readonly commitmentRepository: CommitmentRepository) { }

  async process(createCommitmentDto: CreateCommitmentDto) {
    return this.commitmentRepository.insertOne({
      type: createCommitmentDto.type,
      description: createCommitmentDto.description,
      amount: createCommitmentDto.amount,
      due_date: createCommitmentDto.due_date,
      category: createCommitmentDto.category,
      subcategory: createCommitmentDto.subcategory
    });
  }
}