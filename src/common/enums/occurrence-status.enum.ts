/**
 * Enum representing the status of an occurrence.
 */
export enum OccurrenceStatus {
  /**
   * The occurrence is pending and has not yet been paid.
   */
  PENDING = 'pending',

  /**
   * The occurrence has been paid.
   */
  PAID = 'paid',

  /**
   * The occurrence is overdue and has not been paid by the due date.
   */
  OVERDUE = 'overdue',
}
