import { Injectable } from '@nestjs/common';

import { CreateCommitmentRequestDto } from 'src/modules/commitment/interfaces/create-commitment-request.dto';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';

import { CommitmentPersistenceStrategy } from './interfaces/commitment-persistence-strategy.interface';

import { RecurringPersistenceStrategy } from './strategies/recurring.persistence.strategy';
import { InstallmentPersistenceStrategy } from './strategies/installment-persistence.strategy';
import { OneTimePersistenceStrategy } from './strategies/one-time-persistence.strategy';

/**
 * Service responsible for persisting financial commitments based on their type.
 * It utilizes different strategies for processing commitments of various types
 * (recurring, installment, one-time).
 */
@Injectable()
export class CommitmentPersistenceService {
  private strategies: Record<CommitmentType, CommitmentPersistenceStrategy>;

  constructor(
    private readonly recurringStrategy: RecurringPersistenceStrategy,
    private readonly installmentStrategy: InstallmentPersistenceStrategy,
    private readonly oneTimeStrategy: OneTimePersistenceStrategy,
  ) {
    this.strategies = {
      [CommitmentType.RECURRING]: this.recurringStrategy,
      [CommitmentType.INSTALLMENT]: this.installmentStrategy,
      [CommitmentType.ONE_TIME]: this.oneTimeStrategy,
    };
  }

  /**
   * Processes the creation of a financial commitment using the appropriate strategy
   * based on the commitment type.
   * 
   * @param createCommitmentDto - Data Transfer Object (DTO) containing the details
   * of the commitment to be created.
   * 
   * @returns A promise that resolves to the result of the commitment processing
   * using the selected strategy.
   * 
   * @throws Error if no strategy is found for the provided commitment type.
   */
  async process(createCommitmentRequestDto: CreateCommitmentRequestDto) {
    const strategy = this.strategies[createCommitmentRequestDto.type];
    if (!strategy) {
      throw new Error(`Strategy not found for type ${createCommitmentRequestDto.type}`);
    }
    return strategy.process(createCommitmentRequestDto);
  }
}
