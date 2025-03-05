import { OccurrenceStatus } from "../enums/occurrence-status.enum";

/**
 * Interface representing an occurrence related to a financial commitment.
 */
export interface Occurrence {
  /**
   * Unique identifier for the occurrence.
   */
  id: string;

  /**
   * Due date of the occurrence in YYYY-MM-DD format.
   */
  due_date: string;

  /**
   * Amount of the occurrence.
   */
  amount: number;

  /**
   * Status of the occurrence, indicating whether it is pending, paid, or overdue.
   */
  status: OccurrenceStatus;
}
