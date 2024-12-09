import { Commitment } from "./commitment.interface";
import { Occurrence } from "./occurrence.interface";

export type CommitmentWithOccurrences = Omit<Commitment, 'amount' | 'due_date' | 'start_date' | 'end_date' | 'installments' | 'current_installment'> & {
  occurrences: Array<Omit<Occurrence, 'commitment_id'>>;
};