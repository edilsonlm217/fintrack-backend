import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CommitmentWithOccurrences } from 'src/common/interfaces/commitments-with-occurrences.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { OccurrencesByCommitmentId } from '../interfaces/occurrences-by-commitment-id.interface';

export class CommitmentMapper {
  /**
   * Agrupa as ocorrências por ID do compromisso.
   * 
   * Este método recebe uma lista de ocorrências e retorna um objeto onde as chaves são os IDs dos compromissos
   * (`commitment_id`) e os valores são arrays de ocorrências associadas a cada compromisso. Cada ocorrência dentro 
   * do array terá o campo `commitment_id` omitido, pois já estará agrupado pelo seu ID de compromisso.
   * 
   * Exemplo de saída:
   * 
   * ```typescript
   * 
   * {
   *    "12345": [ // ID do compromisso
   *      {
   *        "_id": "occ1",
   *        "due_date": "2024-12-10",
   *        "amount": 100,
   *        "status": "pending"
   *      },
   *      {
   *        "_id": "occ2",
   *        "due_date": "2025-01-10",
   *        "amount": 120,
   *        "status": "pending"
   *      }
   *    ],
   *    "67890": [ // Outro ID de compromisso
   *      {
   *        "_id": "occ3",
   *        "due_date": "2024-12-15",
   *        "amount": 200,
   *        "status": "pending"
   *      }
   *    ]
   *  }
   * ```
   * 
   * @param occurrences Lista de ocorrências.
   * @returns Objeto com o `commitment_id` como chave e o valor sendo uma lista de ocorrências associadas.
   */
  static groupOccurrencesByCommitmentId(occurrences: Occurrence[]): OccurrencesByCommitmentId {
    return occurrences.reduce((grouped, occurrence) => {
      const { commitment_id, ...rest } = occurrence;

      // Inicializa o array para o ID se não existir
      if (!grouped[commitment_id]) {
        grouped[commitment_id] = [];
      }

      // Adiciona a ocorrência ao grupo
      grouped[commitment_id].push(rest);
      return grouped;
    }, {} as OccurrencesByCommitmentId);
  }

  /**
   * Combina os compromissos com suas ocorrências.
   * @param commitments Lista de compromissos.
   * @param occurrencesByCommitmentId Mapa de ocorrências agrupadas por compromisso.
   * @returns Lista de compromissos com suas ocorrências associadas.
   */
  static combineCommitmentsWithOccurrences(
    commitments: Commitment[],
    occurrencesByCommitmentId: OccurrencesByCommitmentId,
  ): CommitmentWithOccurrences[] {
    return commitments.map((commitment) => ({
      _id: commitment._id,
      type: commitment.type,
      description: commitment.description,
      periodicity: commitment.periodicity,
      category: commitment.category,
      subcategory: commitment.subcategory,
      user_id: commitment.user_id,
      occurrences: occurrencesByCommitmentId[commitment._id] || [],
    }));
  }
}