import { IsUUID, IsISO8601, IsNotEmpty } from 'class-validator';
import { IsStartDateBeforeOrEqualToEndDate } from '../validators/start-date-before-or-equal-to-end-date.validator.ts';

/**
 * DTO for searching financial commitments by a date range.
 */
export class FindCommitmentsByDateRangeDto {
  /**
   * The unique ID of the user performing the query.
   * Must be a valid UUID in version 4 format.
   */
  @IsUUID('4', { message: 'The userId field must be a valid UUID in version 4 format.' })
  userId: string;

  /**
   * The start date of the search range.
   * Must be in ISO 8601 format (e.g., '2024-01-01').
   * This field is required.
   */
  @IsISO8601({}, { message: 'The startDate field must be a valid date in ISO 8601 format.' })
  @IsNotEmpty({ message: 'The startDate field is required.' })
  @IsStartDateBeforeOrEqualToEndDate({ message: 'startDate must be before or equal to endDate.' })
  startDate: string;

  /**
   * The end date of the search range.
   * Must be in ISO 8601 format (e.g., '2024-12-31').
   * This field is required.
   */
  @IsISO8601({}, { message: 'The endDate field must be a valid date in ISO 8601 format.' })
  @IsNotEmpty({ message: 'The endDate field is required.' })
  endDate: string;
}
