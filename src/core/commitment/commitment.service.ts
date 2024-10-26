import { Injectable } from '@nestjs/common';
import { CreateService } from './create/create.service';
import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';

/**
 * Service responsible for handling commitment-related business logic.
 * This service orchestrates the creation of financial commitments
 * by utilizing the CreateService for processing the commitment data.
 */
@Injectable()
export class CommitmentService {
  /**
   * Creates an instance of CommitmentService.
   * 
   * @param createService - An instance of CreateService used for processing commitments.
   */
  constructor(
    private readonly createService: CreateService,
  ) { }

  /**
   * Creates a new financial commitment based on the provided data.
   * 
   * @param createCommitmentDto - Data Transfer Object (DTO) containing the details
   * of the commitment to be created.
   * 
   * @returns A promise that resolves to the result of the commitment creation process.
   */
  async create(createCommitmentDto: CreateCommitmentDto) {
    return this.createService.process(createCommitmentDto);
  }
}
