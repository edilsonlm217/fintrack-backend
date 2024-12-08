import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CommitmentRepository } from 'src/database/repositories/commitment.repository';

@Injectable()
export class FindService {
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
  async findByIds(commitmentIds: string[]): Promise<Commitment[]> {
    return this.commitmentRepository.findByIds(commitmentIds);
  }
}
