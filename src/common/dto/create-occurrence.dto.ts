import { IsNotEmpty, IsString, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { OccurrenceStatus } from '../enums/occurrence-status.enum';

/**
 * Data Transfer Object for creating an occurrence.
 * 
 * This class is used to validate the data when creating a new occurrence in the system.
 * It ensures that all necessary fields are provided and are of the correct type.
 */
export class CreateOccurrenceDto {
  /**
   * ID of the associated commitment.
   * This field must be a non-empty string.
   */
  @IsNotEmpty()
  @IsString()
  commitment_id: string;

  /**
   * Reference to the identifier of the user associated with the financial commitment.
   * Must be a valid UUID.
   */
  @IsNotEmpty({ message: 'The user ID must not be empty.' })
  @IsUUID('4', { message: 'The user ID must be a valid UUID.' })
  user_id: string;

  /**
   * Due date of the occurrence in the format YYYY-MM-DD.
   * This field must be a non-empty string.
   */
  @IsNotEmpty()
  @IsString()
  due_date: string;

  /**
   * Amount of the occurrence.
   * This field must be a non-empty number.
   */
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  /**
   * Status of the occurrence.
   * This field must be a non-empty value from the OccurrenceStatus enum.
   */
  @IsNotEmpty()
  @IsEnum(OccurrenceStatus) // Use the OccurrenceStatus enum
  status: OccurrenceStatus;
}
