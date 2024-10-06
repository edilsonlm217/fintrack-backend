import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';

import { OccurrenceStrategy } from './interfaces/create-strategy.interface';
import { InstallmentOccurrenceStrategy } from './strategies/installment-occurrence.strategy';
import { RecurringOccurrenceStrategy } from './strategies/recurring-occurrence.strategy';
import { OneTimeOccurrenceStrategy } from './strategies/one-time-occurrence.strategy';

@Injectable()
export class CreateService {
  private strategies: Record<CommitmentType, OccurrenceStrategy>;

  constructor(
    private readonly recurringStrategy: RecurringOccurrenceStrategy,
    private readonly installmentStrategy: InstallmentOccurrenceStrategy,
    private readonly oneTimeStrategy: OneTimeOccurrenceStrategy,
  ) {
    this.strategies = {
      [CommitmentType.RECURRING]: this.recurringStrategy,
      [CommitmentType.INSTALLMENT]: this.installmentStrategy,
      [CommitmentType.ONE_TIME]: this.oneTimeStrategy,
    };
  }

  async process(commitment: Commitment) {
    const strategy = this.strategies[commitment.type];
    if (!strategy) {
      throw new Error(`Strategy not found for type ${commitment.type}`);
    }
    return strategy.process(commitment);
  }
}
