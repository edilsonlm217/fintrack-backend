import { Injectable } from '@nestjs/common';
import { OccurrenceService } from '../../occurrence/occurrence.service';
import { CommitmentService } from '../../commitment/commitment.service';
import { UniqueValueExtractor } from './helpers/unique-value-extractor';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';

@Injectable()
export class CommitmentDataService {
  constructor(
    private readonly occurrenceService: OccurrenceService,
    private readonly commitmentService: CommitmentService,
  ) { }

  async createCommitment(createCommitmentDto: CreateCommitmentDto) {
    const commitment = await this.commitmentService.create(createCommitmentDto);
    const occurrences = await this.occurrenceService.create(commitment);
    return { commitment, occurrences };
  }

  async fetchCommitmentsAndOccurrences(userId: string, month: number, year: number) {
    const occurrences = await this.occurrenceService.findByDateRange(userId, month, year);
    const uniqueCommitmentIds = UniqueValueExtractor.extractUniqueValues(occurrences, 'commitment_id');
    const commitments = await this.commitmentService.findByIds(uniqueCommitmentIds);

    return { commitments, occurrences };
  }
}
