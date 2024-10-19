import { Module } from '@nestjs/common';
import { CreateService } from './create.service';
import { RecurringCommitmentStrategy } from './strategies/recurring.commitment.strategy';
import { InstallmentCommitmentStrategy } from './strategies/installment-commitment.strategy';
import { OneTimeCommitmentStrategy } from './strategies/one-time-commitment.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CreateService,
    InstallmentCommitmentStrategy,
    OneTimeCommitmentStrategy,
    RecurringCommitmentStrategy
  ],
  exports: [CreateService]
})
export class CreateModule { }
