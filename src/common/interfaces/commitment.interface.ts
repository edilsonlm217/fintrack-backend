import { CommitmentType } from "../enums/commitment-type.enum";

/**
 * Represents a financial commitment.
 * A financial commitment is any future financial obligation that the user has assumed or plans to assume.
 * These commitments are essential for forecasting expenses and managing budgets effectively.
 */
export interface Commitment {
    /**
     * Unique identifier for the commitment, typically generated by the database.
     * This is optional and may be used to uniquely identify the commitment in the database.
     */
    _id?: string;

    /**
     * The type of the financial commitment. Determines the specific nature of the commitment.
     * Possible values are:
     * - 'fixed' for fixed commitments
     * - 'recurring' for recurring commitments
     * - 'one_time' for one-time commitments
     * - 'installment' for installment commitments
     * - 'planned' for future planned commitments
     */
    type: CommitmentType;

    /**
     * A textual description of the commitment.
     * Provides details about the nature of the commitment (e.g., "Payment for furniture purchase").
     */
    description: string;

    /**
     * The amount associated with the commitment.
     * Can be a fixed value, a variable amount, or null if the amount is not yet determined (e.g., for planned commitments).
     */
    amount: number | null;

    /**
     * The due date for the commitment.
     * Applicable for commitments that have a specific due date, such as fixed, one-time, or planned commitments.
     * The date format should be ISO 8601 (e.g., "2024-10-15").
     */
    due_date?: string;

    /**
     * The start date of the commitment.
     * Applicable for recurring and installment commitments.
     * The date format should be ISO 8601 (e.g., "2024-09-01").
     */
    start_date?: string;

    /**
     * The end date of the commitment.
     * Optional for recurring and installment commitments.
     * The date format should be ISO 8601 (e.g., "2025-09-01").
     */
    end_date?: string;

    /**
     * The periodicity of the commitment.
     * Applicable for recurring commitments to define how often the commitment occurs (e.g., "monthly").
     */
    periodicity?: string;

    /**
     * The total number of installments for the commitment.
     * Applicable for installment commitments, representing how many payments are divided over time.
     */
    installments?: number;

    /**
     * The current installment number for the commitment.
     * Applicable for installment commitments to track which payment is currently being processed.
     */
    current_installment?: number;

    /**
     * The category of the commitment.
     * Used to classify the commitment into broad categories (e.g., "Utilities", "Entertainment").
     */
    category: string;

    /**
     * The subcategory of the commitment.
     * Optional and used for more specific classification within the main category (e.g., "Streaming Services").
     */
    subcategory?: string;
}