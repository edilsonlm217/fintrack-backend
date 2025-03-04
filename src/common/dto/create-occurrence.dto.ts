import { OccurrenceStatus } from '../enums/occurrence-status.enum';

/**
 * Data Transfer Object for creating an occurrence.
 * 
 * This class is used to represent the data when creating a new occurrence in the system.
 * It holds all the necessary fields required to describe the occurrence.
 */
export class CreateOccurrenceDto {
  /**
   * ID of the occurrence.
   * This field is a valid UUID.
   */
  id: string;

  /**
   * ID of the associated commitment.
   * This field is a non-empty string.
   */
  commitment_id: string;

  /**
   * Due date of the occurrence in the format YYYY-MM-DD.
   * This field is a string.
   */
  due_date: string;

  /**
   * Amount of the occurrence.
   * This field is a number.
   */
  amount: number;

  /**
   * Status of the occurrence.
   * This field must be a valid value from the OccurrenceStatus enum.
   */
  status: OccurrenceStatus;
}
