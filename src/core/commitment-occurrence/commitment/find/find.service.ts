import { Injectable } from '@nestjs/common';
import { CommitmentRetrievalService } from './commitment-retrieval/commitment-retrieval.service';

@Injectable()
export class FindService {
  constructor(private readonly commitmentRetrievalService: CommitmentRetrievalService) { }

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
    return this.commitmentRetrievalService.findByIds(commitmentIds);
  }
}
