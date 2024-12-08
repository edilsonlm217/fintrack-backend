import { Injectable } from '@nestjs/common';
import { CommitmentMapper } from './helpers/commitment-mapper';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

@Injectable()
export class CommitmentMapperService {
  /**
   * Mapeia compromissos e ocorrências usando o CommitmentMapper.
   * 
   * Este método recebe uma lista de compromissos e uma lista de ocorrências e retorna uma lista de compromissos 
   * com as ocorrências associadas a cada compromisso. O compromisso será mapeado com algumas de suas propriedades 
   * omitidas e as ocorrências terão o campo `commitment_id` omitido.
   * 
   * Exemplo de saída:
   * 
   * ```typescript
   * [
   *   {
   *     "_id": "6753735b47c11020cc3c5e8f",
   *     "type": "installment",
   *     "description": "Pagamento de aluguel casa Los Frailejones",
   *     "category": "Moradia",
   *     "subcategory": "Aluguel",
   *     "occurrences": [
   *       {
   *         "_id": "6753735b47c11020cc3c5e93",
   *         "due_date": "2025-01-31",
   *         "amount": 100,
   *         "status": "pending"
   *       }
   *     ]
   *   },
   *   {
   *     "_id": "67537cb04ad8bc0cad11515b",
   *     "type": "recurring",
   *     "description": "Assinatura do Netflix",
   *     "category": "Entretenimento",
   *     "subcategory": null,
   *     "occurrences": [
   *       {
   *         "_id": "67537cb14ad8bc0cad11515d",
   *         "due_date": "2025-01-05",
   *         "amount": 49.9,
   *         "status": "pending"
   *       }
   *     ]
   *   }
   * ]
   * ```
   * 
   * @param commitments Lista de compromissos.
   * @param occurrences Lista de ocorrências.
   * @returns Lista de compromissos mapeados com suas ocorrências.
   */
  mapCommitmentsWithOccurrences(
    commitments: Commitment[],
    occurrences: Occurrence[],
  ) {
    const occurrencesByCommitmentId = CommitmentMapper.groupOccurrencesByCommitmentId(occurrences);
    return CommitmentMapper.combineCommitmentsWithOccurrences(commitments, occurrencesByCommitmentId);
  }
}
