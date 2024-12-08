import { CommitmentPeriodicity } from "src/common/enums/commitment-periodicity.enum";

/**
 * Interface for the parameters of the calculateOccurrenceDate method.
 */
export interface CalculateOccurrenceDateParams {
    /**
     * The start date as an ISO string.
     */
    startDateString: string;

    /**
     * The index of the occurrence (0-based).
     */
    occurrenceIndex: number;

    /**
     * The periodicity of the commitment.
     */
    periodicity: CommitmentPeriodicity;
}
