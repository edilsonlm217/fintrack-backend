import { Injectable } from '@nestjs/common';
import { CommitmentRepository } from 'src/database/mongo/repositories/commitment.repository';

@Injectable()
export class CommitmentRetrievalService {
  constructor(private readonly commitmentRepository: CommitmentRepository) { }

  /**
   * Retrieves commitments based on a list of IDs.
   * 
   * This method delegates the retrieval logic to the CommitmentRepository to fetch 
   * commitments that match the provided IDs.
   * 
   * @param commitmentIds - An array of unique IDs corresponding to the commitments.
   * @returns A Promise resolving to an array of commitments that match the provided IDs.
   */
  async findByIds(commitmentIds: string[]) {
    return this.commitmentRepository.findByIds(commitmentIds);
  }
}
