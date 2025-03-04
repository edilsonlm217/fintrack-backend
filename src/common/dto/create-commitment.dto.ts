import { CommitmentPeriodicity } from "src/common/enums/commitment-periodicity.enum";
import { CommitmentType } from "src/common/enums/commitment-type.enum";

/**
 * Data Transfer Object (DTO) for creating a financial commitment.
 * This DTO reflects the data sent by the client in the API request.
 */
export class CreateCommitmentDto {

  /**
   * Unique identifier for the commitment.
   * Generated automatically when creating the commitment.
   */
  id: string;

  /**
   * Defines the type of financial commitment.
   * Must be one of the values from the CommitmentType enum:
   * 'recurring', 'one_time', 'installment'.
   */
  type: CommitmentType;

  /**
   * A brief description of the financial commitment.
   * This field is required and must be a non-empty string.
   */
  description: string;

  /**
   * The amount associated with the financial commitment.
   * Must be a valid number, greater than zero, and is required.
   */
  amount: number;

  /**
   * For commitments with a fixed or estimated due date.
   * This field is only applicable for fixed, one-time, or planned commitments.
   * The due date must be a valid ISO date string.
   */
  due_date: string;

  /**
   * Defines the periodicity for recurring commitments (e.g., weekly, monthly).
   * This field is only applicable for recurring commitments.
   */
  periodicity?: CommitmentPeriodicity;

  /**
   * Defines the total number of installments for installment-based commitments.
   * This field is only applicable for installment commitments.
   * Must be a valid integer.
   */
  installments?: number;

  /**
   * Defines the current installment number in an installment-based commitment.
   * This field is only applicable for installment commitments.
   * Must be a valid integer.
   */
  current_installment?: number;

  /**
   * Defines the category of the financial commitment (e.g., Education, Utilities).
   * This field is required and must be a valid string.
   */
  category: string;

  /**
   * Defines an optional subcategory for the financial commitment.
   * Must be a valid string if provided.
   */
  subcategory?: string;
}
