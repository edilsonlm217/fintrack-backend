import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';

import { CommitmentType } from 'src/common/enums/commitment-type.enum';
import { RecurringGenerationStrategy } from './strategies/recurring-generation.strategy';
import { InstallmentGenerationStrategy } from './strategies/installment-generation.strategy';
import { OneTimeGenerationStrategy } from './strategies/one-time-generation.strategy';
import { GenerationStrategy } from './interfaces/generation-strategy.interface';

/**
 * Service responsible for generating occurrences based on different types of commitments.
 * It utilizes various generation strategies for different commitment types to produce occurrences.
 */
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

  /**
   * Processes a commitment to generate occurrences using the appropriate strategy.
   *
   * @param commitment - The commitment for which occurrences will be generated.
   *
   * @returns A Promise that resolves to an array of generated occurrences.
   *
   * @throws Error if the strategy for the given commitment type is not found.
   */
  async process(commitment: Commitment) {
    const strategy = this.strategies[commitment.type];
    if (!strategy) {
      throw new Error(`Strategy not found for type ${commitment.type}`);
    }
    return strategy.process(commitment);
  }
}
