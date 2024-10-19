import { Module } from '@nestjs/common';

import { InstallmentCalculationModule } from './submodules/installmente-calculation/installment-calculation.module';
import { OccurrenceDateModule } from './submodules/occurrence-date/occurrence-date.module';

import { OccurrenceGenerationService } from './occurrence-generation.service';

@Module({
  imports: [
    InstallmentCalculationModule,
    OccurrenceDateModule,
  ],
  controllers: [],
  providers: [OccurrenceGenerationService],
  exports: [
    OccurrenceGenerationService,
  ]
})
export class OccurrenceGenerationModule { }
