import { Commitment } from "src/common/interfaces/commitment.interface";
import { Occurrence } from "src/common/interfaces/occurrence.interface";

export class CommitmentMapper {
  // Função para mapear as ocorrências para os compromissos
  static mapOccurrencesToCommitments(occurrences: Occurrence[]): Record<string, Array<Omit<Occurrence, 'commitment_id'>>> {
    return occurrences.reduce((map, occurrence) => {
      if (!map[occurrence.commitment_id]) {
        map[occurrence.commitment_id] = [];
      }
      map[occurrence.commitment_id].push({
        _id: occurrence._id,
        due_date: occurrence.due_date,
        amount: occurrence.amount,
        status: occurrence.status,
      });
      return map;
    }, {} as Record<string, Array<Omit<Occurrence, 'commitment_id'>>>);
  }

  // Função para unir os compromissos com suas ocorrências
  static mergeCommitmentsWithOccurrences(commitments: Commitment[], occurrencesByCommitment: Record<string, Array<Omit<Occurrence, 'commitment_id'>>>): any[] {
    return commitments.map((commitment) => ({
      _id: commitment._id,
      type: commitment.type,
      description: commitment.description,
      category: commitment.category,
      subcategory: commitment.subcategory,
      occurrences: occurrencesByCommitment[commitment._id] || [],
    }));
  }
}