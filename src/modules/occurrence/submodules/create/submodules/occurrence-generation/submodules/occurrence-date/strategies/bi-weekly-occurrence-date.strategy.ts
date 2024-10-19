import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

/**
 * A strategy implementation for calculating bi-weekly occurrence dates.
 * 
 * This class defines the logic for generating occurrence dates that occur 
 * every two weeks based on a provided start date.
 */
@Injectable()
export class BiWeeklyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  /**
   * Calculates the occurrence date for a bi-weekly schedule based on the 
   * provided start date and occurrence index.
   * 
   * @param startDate - The starting date from which to calculate the 
   * occurrence date.
   * @param occurrenceIndex - The index of the occurrence (0-based), which 
   * determines how many bi-weekly intervals to add to the start date.
   * @returns The calculated occurrence date as a DateTime object.
   */
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    return startDate.plus({ weeks: occurrenceIndex * 2 });
  }

  /**
   * Gets the total number of occurrences for a bi-weekly schedule within a 
   * year. In this implementation, it returns a fixed number of 26.
   * 
   * @returns The total number of occurrences as a number, which is 26 for 
   * bi-weekly occurrences within a year.
   */
  getTotalOccurrences(): number {
    return 26; // Total occurrences in a year for bi-weekly strategy
  }
}
