import { CommitmentPeriodicity } from "src/common/enums/commitment-periodicity.enum";

export interface RecurringDetails {
  dueDate: string; // ou Date, dependendo do formato que você está utilizando
  monthlyAmount: number;
  periodicity: CommitmentPeriodicity; // Ajuste o tipo conforme o que você usa para periodicidade
  numberOfOccurrences: number;
}