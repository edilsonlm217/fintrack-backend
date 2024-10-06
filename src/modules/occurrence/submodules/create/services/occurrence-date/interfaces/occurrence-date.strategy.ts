import { DateTime } from "luxon";

export interface OccurrenceDateStrategy {
  calculateOccurrenceDate(startDate: DateTime, occurrenceIndex: number): DateTime;
  getTotalOccurrences(): number;
}
