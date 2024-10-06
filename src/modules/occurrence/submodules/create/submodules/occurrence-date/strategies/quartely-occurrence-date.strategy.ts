import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

/**
 * A strategy implementation for calculating quarterly occurrence dates.
 * 
 * This class defines the logic for generating occurrence dates that occur 
 * on a quarterly basis based on a provided start date.
 */
@Injectable()
export class QuarterlyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  /**
   * Calculates the occurrence date for a quarterly schedule based on the 
   * provided start date and occurrence index.
   * 
   * This method adds three months for each occurrence index to the start date.
   * 
   * @param startDate - The starting date from which to calculate the 
   * occurrence date.
   * @param occurrenceIndex - The index of the occurrence (0-based), which 
   * determines how many quarters to add to the start date.
   * @returns The calculated occurrence date as a DateTime object.
   */
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    return startDate.plus({ months: occurrenceIndex * 3 });
  }

  /**
   * Gets the total number of occurrences for a quarterly schedule within a 
   * year. In this implementation, it returns a fixed number of 4.
   * 
   * @returns The total number of occurrences as a number, which is 4 for 
   * quarterly occurrences within a year.
   */
  getTotalOccurrences(): number {
    return 4; // Total occurrences in a year for quarterly strategy
  }
}
