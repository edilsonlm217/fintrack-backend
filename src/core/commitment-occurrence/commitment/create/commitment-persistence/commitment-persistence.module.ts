import { CommitmentPersistenceService } from './commitment-persistence.service';
import { Module } from '@nestjs/common';
import { InstallmentPersistenceStrategy } from './strategies/installment-persistence.strategy';
import { RecurringPersistenceStrategy } from './strategies/recurring.persistence.strategy';
import { OneTimePersistenceStrategy } from './strategies/one-time-persistence.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CommitmentPersistenceService,
    InstallmentPersistenceStrategy,
    OneTimePersistenceStrategy,
    RecurringPersistenceStrategy,
  ],
  exports: [CommitmentPersistenceService]
})
export class CommitmentPersistenceModule { }
