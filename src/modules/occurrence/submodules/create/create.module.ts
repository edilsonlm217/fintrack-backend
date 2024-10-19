import { Module } from '@nestjs/common';

import { OccurrenceGenerationModule } from './submodules/occurrence-generation/occurrence-generation.module';

import { InstallmentOccurrenceStrategy } from './strategies/installment-occurrence.strategy';
import { RecurringOccurrenceStrategy } from './strategies/recurring-occurrence.strategy';
import { OneTimeOccurrenceStrategy } from './strategies/one-time-occurrence.strategy';

import { CreateService } from './create.service';

@Module({
  imports: [OccurrenceGenerationModule],
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
