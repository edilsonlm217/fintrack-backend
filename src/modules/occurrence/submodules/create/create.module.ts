import { Module } from '@nestjs/common';
import { CreateService } from './create.service';
import { InstallmentOccurrenceStrategy } from './strategies/installment-occurrence.strategy';
import { RecurringOccurrenceStrategy } from './strategies/recurring-occurrence.strategy';
import { OneTimeOccurrenceStrategy } from './strategies/one-time-occurrence.strategy';
import { OccurrenceDateModule } from './submodules/occurrence-date/occurrence-date.module';

@Module({
  imports: [OccurrenceDateModule],
  controllers: [],
  providers: [
    CreateService,
    RecurringOccurrenceStrategy,
    InstallmentOccurrenceStrategy,
    OneTimeOccurrenceStrategy
  ],
  exports: [CreateService]
})
export class CreateModule { }
