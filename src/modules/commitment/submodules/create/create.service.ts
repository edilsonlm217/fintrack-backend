import { Injectable } from '@nestjs/common';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentPersistenceService } from './submodules/commitment-persistence/commitment-persistence.service';

@Injectable()
export class CreateService {
  constructor(private readonly commitmentPersistenceService: CommitmentPersistenceService) { }

  async process(createCommitmentDto: CreateCommitmentDto) {
    return this.commitmentPersistenceService.process(createCommitmentDto);
  }
}
