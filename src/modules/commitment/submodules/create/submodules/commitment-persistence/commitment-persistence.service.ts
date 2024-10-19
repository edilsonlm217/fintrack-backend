import { Injectable } from '@nestjs/common';

import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';

import { CommitmentPersistenceStrategy } from './interfaces/commitment-persistence-strategy.interface';

import { RecurringPersistenceStrategy } from './strategies/recurring.persistence.strategy';
import { InstallmentPersistenceStrategy } from './strategies/installment-persistence.strategy';
import { OneTimePersistenceStrategy } from './strategies/one-time-persistence.strategy';

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

  async process(createCommitmentDto: CreateCommitmentDto) {
    const strategy = this.strategies[createCommitmentDto.type];
    if (!strategy) {
      throw new Error(`Strategy not found for type ${createCommitmentDto.type}`);
    }
    return strategy.process(createCommitmentDto);
  }
}
