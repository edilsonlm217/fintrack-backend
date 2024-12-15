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
