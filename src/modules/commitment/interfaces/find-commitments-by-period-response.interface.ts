import { CommitmentWithOccurrences } from "src/common/interfaces/commitments-with-occurrences.interface";

export interface FindCommitmentsByPeriodResponse {
  /**
   * A message describing the status of the request.
   */
  message: string;  // Status message of the request

  /**
   * Context containing details of the request such as user ID, month, and year.
   */
  context: {
    /**
     * The ID of the user for whom commitments are retrieved.
     */
    userId: string;

    /**
     * The month for which commitments are retrieved.
     */
    month: number;

    /**
     * The year for which commitments are retrieved.
     */
    year: number;
  };

  /**
   * A list of commitments with their corresponding occurrences.
   */
  commitments: CommitmentWithOccurrences[];
}
