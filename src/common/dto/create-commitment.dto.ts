import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsDateString, ValidateIf, IsInt } from 'class-validator';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';

/**
 * Data Transfer Object (DTO) for creating a financial commitment.
 * Contains information such as type, description, amount, dates,
 * and other characteristics of the commitment.
 */
export class CreateCommitmentDto {

  /**
   * Defines the type of financial commitment.
   * Must be one of the values from the CommitmentType enum:
   * 'fixed', 'recurring', 'one_time', 'installment', or 'planned'.
   */
  @IsNotEmpty({ message: 'The commitment type must not be empty.' })
  @IsEnum(CommitmentType, { message: 'Invalid commitment type.' })
  type: CommitmentType;

  /**
   * A brief description of the financial commitment.
   * This field is required and must be a non-empty string.
   */
  @IsNotEmpty({ message: 'The description must not be empty.' })
  @IsString({ message: 'The description must be a string.' })
  description: string;

  /**
   * The amount associated with the financial commitment.
   * Must be a valid number and is required.
   */
  @IsNotEmpty({ message: 'The amount is required.' })
  @IsNumber({}, { message: 'The amount must be a valid number.' })
  amount: number;

  /**
   * For commitments with a fixed or estimated due date.
   * This field is only applicable for fixed, one-time, or planned commitments.
   * The due date must be a valid ISO date string.
   */
  @ValidateIf(o => o.type === CommitmentType.FIXED || o.type === CommitmentType.ONE_TIME || o.type === CommitmentType.PLANNED)
  @IsDateString({}, { message: 'The due date must be a valid ISO date.' })
  @IsOptional()
  due_date?: string;

  /**
   * Start date for recurring or installment-based commitments.
   * This field is required for these types and must be a valid ISO date string.
   */
  @ValidateIf(o => o.type === CommitmentType.RECURRING || o.type === CommitmentType.INSTALLMENT)
  @IsDateString({}, { message: 'The start date must be a valid ISO date.' })
  start_date?: string;

  /**
   * End date for recurring or installment-based commitments.
   * This field is optional and must be a valid ISO date string.
   */
  @ValidateIf(o => o.type === CommitmentType.RECURRING || o.type === CommitmentType.INSTALLMENT)
  @IsDateString({}, { message: 'The end date must be a valid ISO date.' })
  @IsOptional()
  end_date?: string;

  /**
   * Defines the periodicity for recurring commitments (e.g., weekly, monthly).
   * This field is only applicable for recurring commitments.
   */
  @ValidateIf(o => o.type === CommitmentType.RECURRING)
  @IsString({ message: 'The periodicity must be a valid string.' })
  periodicity?: string;

  /**
   * Defines the total number of installments for installment-based commitments.
   * This field is only applicable for installment commitments.
   * Must be a valid integer.
   */
  @ValidateIf(o => o.type === CommitmentType.INSTALLMENT)
  @IsInt({ message: 'The number of installments must be an integer.' })
  installments?: number;

  /**
   * Defines the current installment number in an installment-based commitment.
   * This field is only applicable for installment commitments.
   * Must be a valid integer.
   */
  @ValidateIf(o => o.type === CommitmentType.INSTALLMENT)
  @IsInt({ message: 'The current installment must be an integer.' })
  current_installment?: number;

  /**
   * Defines the category of the financial commitment (e.g., Education, Utilities).
   * This field is required and must be a valid string.
   */
  @IsNotEmpty({ message: 'The category must not be empty.' })
  @IsString({ message: 'The category must be a string.' })
  category: string;

  /**
   * Defines an optional subcategory for the financial commitment.
   * Must be a valid string if provided.
   */
  @IsOptional()
  @IsString({ message: 'The subcategory must be a string.' })
  subcategory?: string;
}