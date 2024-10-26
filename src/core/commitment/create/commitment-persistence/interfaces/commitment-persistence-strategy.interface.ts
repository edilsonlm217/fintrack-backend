import { Commitment } from "src/common/interfaces/commitment.interface";
import { CreateCommitmentDto } from "src/common/dto/create-commitment.dto";

/**
 * Interface that defines a strategy for persisting financial commitments.
 * Classes implementing this interface must provide a way to process
 * the creation of commitments based on a specific type.
 */
export interface CommitmentPersistenceStrategy {
  /**
   * Processes the creation of a financial commitment.
   * 
   * @param createCommitmentDto - Data Transfer Object (DTO) that contains the data
   * for the commitment to be created.
   * 
   * @returns A Promise that resolves to the created commitment.
   */
  process(createCommitmentDto: CreateCommitmentDto): Promise<Commitment>;
}
