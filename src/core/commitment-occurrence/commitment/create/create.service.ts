import { Injectable } from '@nestjs/common';
import { CreateCommitmentRequestDto } from 'src/modules/commitment/interfaces/create-commitment-request.dto';
import { CommitmentPersistenceService } from './commitment-persistence/commitment-persistence.service';

/**
 * Service responsible for processing the creation of financial commitments.
 * This service delegates the actual persistence of the commitment data
 * to the CommitmentPersistenceService.
 */
@Injectable()
export class CreateService {
  constructor(private readonly commitmentPersistenceService: CommitmentPersistenceService) { }

  /**
   * Processes the creation of a financial commitment.
   * 
   * @param createCommitmentDto - Data Transfer Object (DTO) containing the details
   * of the commitment to be created.
   * 
   * @returns A promise that resolves to the result of the commitment persistence process.
   */
  async process(createCommitmentRequestDto: CreateCommitmentRequestDto) {
    return this.commitmentPersistenceService.process(createCommitmentRequestDto);
  }
}
