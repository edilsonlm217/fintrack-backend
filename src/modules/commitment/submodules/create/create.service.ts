import { Injectable } from '@nestjs/common';

import { CreateCommitmentDto } from 'src/modules/commitment/dto/create-commitment.dto';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';

import { CommitmentStrategy } from './interfaces/create-strategy.interface';

import { FixedCommitmentStrategy } from './strategies/fixed-commitment.strategy';
import { InstallmentCommitmentStrategy } from './strategies/installment-commitment.strategy';
import { OneTimeCommitmentStrategy } from './strategies/one-time-commitment.strategy';
import { PlannedCommitmentStrategy } from './strategies/planned-commitment.strategy';
import { RecurringCommitmentStrategy } from './strategies/recurring.commitment.strategy';

@Injectable()
export class CreateService {
  private strategies: Record<CommitmentType, CommitmentStrategy>;

  constructor(
    private readonly fixedStrategy: FixedCommitmentStrategy,
    private readonly installmentStrategy: InstallmentCommitmentStrategy,
    private readonly oneTimeStrategy: OneTimeCommitmentStrategy,
    private readonly plannedStrategy: PlannedCommitmentStrategy,
    private readonly recurringStrategy: RecurringCommitmentStrategy,
  ) {
    this.strategies = {
      [CommitmentType.FIXED]: this.fixedStrategy,
      [CommitmentType.RECURRING]: this.recurringStrategy,
      [CommitmentType.ONE_TIME]: this.oneTimeStrategy,
      [CommitmentType.PLANNED]: this.plannedStrategy,
      [CommitmentType.INSTALLMENT]: this.installmentStrategy,
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
