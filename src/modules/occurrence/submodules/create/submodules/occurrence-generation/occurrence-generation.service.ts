import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';

import { CommitmentType } from 'src/common/enums/commitment-type.enum';
import { RecurringGenerationStrategy } from './strategies/recurring-generation.strategy';
import { InstallmentGenerationStrategy } from './strategies/installment-generation.strategy';
import { OneTimeGenerationStrategy } from './strategies/one-time-generation.strategy';
import { GenerationStrategy } from './interfaces/generation-strategy.interface';

@Injectable()
export class OccurrenceGenerationService {
  private strategies: Record<CommitmentType, GenerationStrategy>;

  constructor(
    private readonly recurringStrategy: RecurringGenerationStrategy,
    private readonly installmentStrategy: InstallmentGenerationStrategy,
    private readonly oneTimeStrategy: OneTimeGenerationStrategy,
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
