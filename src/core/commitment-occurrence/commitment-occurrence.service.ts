import { Injectable } from '@nestjs/common';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentDataService } from './services/commitment-data/commitment-data.service';

@Injectable()
export class CommitmentOccurrenceService {
  constructor(private readonly commitmentDataService: CommitmentDataService) { }

  async createCommitment(createCommitmentDto: CreateCommitmentDto) {
    return this.commitmentDataService.createCommitment(createCommitmentDto);
  }

  async fetchCommitmentsWithOccurrencesForPeriod(userId: string, month: number, year: number) {
    return this.commitmentDataService.fetchCommitmentsWithOccurrencesForPeriod(userId, month, year);
  }
}
