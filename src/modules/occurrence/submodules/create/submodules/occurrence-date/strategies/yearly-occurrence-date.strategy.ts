import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

/**
 * A strategy implementation for calculating yearly occurrence dates.
 * 
 * This class defines the logic for generating occurrence dates that occur 
 * on a yearly basis based on a provided start date.
 */
@Injectable()
export class YearlyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  /**
   * Calculates the occurrence date for a yearly schedule based on the 
   * provided start date and occurrence index.
   * 
   * This method adds one year for each occurrence index to the start date.
   * 
   * @param startDate - The starting date from which to calculate the 
   * occurrence date.
   * @param occurrenceIndex - The index of the occurrence (0-based), which 
   * determines how many years to add to the start date.
   * @returns The calculated occurrence date as a DateTime object.
   */
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    return startDate.plus({ years: occurrenceIndex });
  }

  /**
   * Gets the total number of occurrences for a yearly schedule within a 
   * year. In this implementation, it returns a fixed number of 1.
   * 
   * @returns The total number of occurrences as a number, which is 1 for 
   * yearly occurrences.
   */
  getTotalOccurrences(): number {
    return 1; // Total occurrences in a year for yearly strategy
  }
}
