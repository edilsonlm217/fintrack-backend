import { Module } from '@nestjs/common';

import { InstallmentCalculationModule } from './submodules/installmente-calculation/installment-calculation.module';
import { OccurrenceDateModule } from './submodules/occurrence-date/occurrence-date.module';

import { OccurrenceGenerationService } from './occurrence-generation.service';
import { InstallmentGenerationStrategy } from './strategies/installment-generation.strategy';
import { OneTimeGenerationStrategy } from './strategies/one-time-generation.strategy';
import { RecurringGenerationStrategy } from './strategies/recurring-generation.strategy';

@Module({
  imports: [
    InstallmentCalculationModule,
    OccurrenceDateModule,
  ],
  controllers: [],
  providers: [
    OccurrenceGenerationService,
    InstallmentGenerationStrategy,
    OneTimeGenerationStrategy,
    RecurringGenerationStrategy,
  ],
  exports: [
    OccurrenceGenerationService,
  ]
})
export class OccurrenceGenerationModule { }
