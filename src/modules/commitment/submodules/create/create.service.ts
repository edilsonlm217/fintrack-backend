import { Injectable } from '@nestjs/common';

import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';

import { CommitmentStrategy } from './interfaces/create-strategy.interface';

import { RecurringCommitmentStrategy } from './strategies/recurring.commitment.strategy';
import { InstallmentCommitmentStrategy } from './strategies/installment-commitment.strategy';
import { OneTimeCommitmentStrategy } from './strategies/one-time-commitment.strategy';

@Injectable()
export class CreateService {
  private strategies: Record<CommitmentType, CommitmentStrategy>;

  constructor(
    private readonly recurringStrategy: RecurringCommitmentStrategy,
    private readonly installmentStrategy: InstallmentCommitmentStrategy,
    private readonly oneTimeStrategy: OneTimeCommitmentStrategy,
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
