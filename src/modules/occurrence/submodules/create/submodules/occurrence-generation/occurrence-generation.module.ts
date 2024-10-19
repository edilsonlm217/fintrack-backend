import { Module } from '@nestjs/common';

import { InstallmentCalculationModule } from './submodules/installmente-calculation/installment-calculation.module';
import { OccurrenceDateModule } from './submodules/occurrence-date/occurrence-date.module';
import { OccurrencePersistenceModule } from '../occurrence-persistence/occurrence-persistence.module';

import { OccurrenceGenerationService } from './occurrence-generation.service';

@Module({
  imports: [
    InstallmentCalculationModule,
    OccurrenceDateModule,
    OccurrencePersistenceModule,
  ],
  controllers: [],
  providers: [OccurrenceGenerationService],
  exports: [
    OccurrenceGenerationService,
  ]
})
export class OccurrenceGenerationModule { }
