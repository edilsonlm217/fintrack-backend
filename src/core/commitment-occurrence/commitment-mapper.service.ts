import { Injectable } from '@nestjs/common';
import { CommitmentMapper } from './commitment-mapper';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

@Injectable()
export class CommitmentMapperService {
  mapCommitmentsWithOccurrences(commitments: Commitment[], occurrences: Occurrence[]) {
    const occurrencesByCommitment = CommitmentMapper.mapOccurrencesToCommitments(occurrences);
    return CommitmentMapper.mergeCommitmentsWithOccurrences(commitments, occurrencesByCommitment);
  }
}
