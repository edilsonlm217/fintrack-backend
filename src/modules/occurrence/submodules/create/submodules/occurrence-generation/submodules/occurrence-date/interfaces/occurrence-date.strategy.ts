import { DateTime } from "luxon";

/**
 * An interface that defines a strategy for calculating occurrence dates 
 * based on a given start date and managing total occurrences.
 */
export interface OccurrenceDateStrategy {
  /**
   * Calculates the occurrence date based on the specified start date and 
   * the index of the occurrence.
   * 
   * @param startDate - The starting date from which to calculate occurrences.
   * @param occurrenceIndex - The index representing the specific occurrence 
   * to calculate (e.g., 0 for the first occurrence, 1 for the second).
   * @returns The calculated occurrence date as a DateTime object.
   */
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime;

  /**
   * Gets the total number of occurrences that can be generated based on the 
   * defined periodicity or criteria of the implementing class.
   * 
   * @returns The total number of occurrences as a number.
   */
  getTotalOccurrences(): number;
}
