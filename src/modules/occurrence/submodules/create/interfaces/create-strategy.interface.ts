import { Commitment } from "src/common/interfaces/commitment.interface";
import { Occurrence } from "src/common/interfaces/occurrence.interface";

/**
 * Interface for strategies that process commitments to generate occurrences.
 */
export interface OccurrenceStrategy {
  /**
   * Processes a commitment and generates a list of occurrences.
   * @param commitment - The commitment to process, containing relevant details.
   * @returns A promise that resolves to an array of occurrences generated from the commitment.
   */
  process(commitment: Commitment): Promise<Occurrence[]>;
}
