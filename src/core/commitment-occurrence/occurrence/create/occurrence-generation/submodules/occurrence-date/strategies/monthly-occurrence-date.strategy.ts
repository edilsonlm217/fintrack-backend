import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OccurrenceDateStrategy } from '../interfaces/occurrence-date.strategy';

/**
 * A strategy implementation for calculating monthly occurrence dates.
 * 
 * This class defines the logic for generating occurrence dates that occur 
 * on a monthly basis based on a provided start date.
 */
@Injectable()
export class MonthlyOccurrenceDateStrategy implements OccurrenceDateStrategy {
  /**
   * Calculates the occurrence date for a monthly schedule based on the 
   * provided start date and occurrence index.
   * 
   * This method adds the occurrence index (in months) to the start date.
   * If the resulting day does not match the day of the start date, it 
   * adjusts the date to the end of the month.
   * 
   * @param startDate - The starting date from which to calculate the 
   * occurrence date.
   * @param occurrenceIndex - The index of the occurrence (0-based), which 
   * determines how many months to add to the start date.
   * @returns The calculated occurrence date as a DateTime object.
   */
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime {
    let occurrenceDate = startDate.plus({ months: occurrenceIndex });
    // Adjust to the end of the month if necessary
    if (occurrenceDate.day !== startDate.day) {
      occurrenceDate = occurrenceDate.endOf('month');
    }
    return occurrenceDate;
  }

  /**
   * Gets the total number of occurrences for a monthly schedule within a 
   * year. In this implementation, it returns a fixed number of 12.
   * 
   * @returns The total number of occurrences as a number, which is 12 for 
   * monthly occurrences within a year.
   */
  getTotalOccurrences(): number {
    return 12; // Total occurrences in a year for monthly strategy
  }
}
