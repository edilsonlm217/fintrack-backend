import { Commitment } from "src/common/interfaces/commitment.interface";
import { Occurrence } from "src/common/interfaces/occurrence.interface";

/**
 * Interface that defines the structure of the response returned when creating a new financial commitment.
 * This interface is used to ensure consistent responses from the `createCommitment` method in the `CommitmentController`.
 */
export interface CreateCommitmentResponse {
  /**
   * A message providing additional context about the operation.
   * Typically used to indicate the successful creation of the commitment.
   */
  message: string;

  /**
   * Data object containing details of the created commitment and its occurrences.
   */
  data: {
    /**
     * The created financial commitment.
     * Contains all the details related to the newly created commitment.
     */
    commitment: Commitment;

    /**
     * An array of occurrences related to the created commitment.
     * Each occurrence represents an instance or event derived from the commitment.
     */
    occurrences: Array<Occurrence>;
  };
}
