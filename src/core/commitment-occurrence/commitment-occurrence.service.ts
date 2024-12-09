import { Injectable } from '@nestjs/common';
import { OccurrenceService } from './occurrence/occurrence.service';
import { CommitmentService } from './commitment/commitment.service';
import { CommitmentMapperService } from './services/commitment-mapper/commitment-mapper.service';
import { UniqueValueExtractor } from './services/unique-value-extractor';

import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';

@Injectable()
export class CommitmentOccurrenceService {
  constructor(
    private readonly occurrenceService: OccurrenceService,
    private readonly commitmentService: CommitmentService,
    private readonly commitmentMapperService: CommitmentMapperService,
  ) { }

  async createCommitment(createCommitmentDto: CreateCommitmentDto) {
    const commitment = await this.commitmentService.create(createCommitmentDto);
    const occurrences = await this.occurrenceService.create(commitment);
    return { commitment, occurrences };
  }

  async fetchCommitmentsWithOccurrencesForPeriod(userId: string, month: number, year: number) {
    const occurrences = await this.occurrenceService.findByDateRange(userId, month, year);
    const uniqueCommitmentIds = UniqueValueExtractor.extractUniqueValues(occurrences, 'commitment_id');
    const commitments = await this.commitmentService.findByIds(uniqueCommitmentIds);
    return this.commitmentMapperService.mapCommitmentsWithOccurrences(commitments, occurrences);
  }
}
