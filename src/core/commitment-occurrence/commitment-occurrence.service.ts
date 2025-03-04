import { Injectable } from '@nestjs/common';
import { OccurrenceService } from './occurrence/occurrence.service';
import { CommitmentService } from './commitment/commitment.service';

import { CreateCommitmentRequestDto } from 'src/modules/commitment/interfaces/create-commitment-request.dto';

@Injectable()
export class CommitmentOccurrenceService {
  constructor(
    private readonly occurrenceService: OccurrenceService,
    private readonly commitmentService: CommitmentService,
  ) { }

  async createCommitment(createCommitmentRequestDto: CreateCommitmentRequestDto) {
    const commitment = await this.commitmentService.create(createCommitmentRequestDto);
    const occurrences = await this.occurrenceService.create(commitment);
    return { commitment, occurrences };
  }
}
