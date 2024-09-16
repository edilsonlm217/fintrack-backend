import { Module } from '@nestjs/common';
import { CreateService } from './create.service';
import { FixedCommitmentStrategy } from './strategies/fixed-commitment.strategy';
import { InstallmentCommitmentStrategy } from './strategies/installment-commitment.strategy';
import { OneTimeCommitmentStrategy } from './strategies/one-time-commitment.strategy';
import { PlannedCommitmentStrategy } from './strategies/planned-commitment.strategy';
import { RecurringCommitmentStrategy } from './strategies/recurring.commitment.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CreateService,
    FixedCommitmentStrategy,
    InstallmentCommitmentStrategy,
    OneTimeCommitmentStrategy,
    PlannedCommitmentStrategy,
    RecurringCommitmentStrategy
  ],
  exports: [CreateService]
})
export class CreateModule { }
