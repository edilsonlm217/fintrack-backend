import { Module } from '@nestjs/common';

import { InstallmentCalculationModule } from './submodules/installmente-calculation/installment-calculation.module';
import { OccurrenceDateModule } from './submodules/occurrence-date/occurrence-date.module';
import { OccurrencePersistenceModule } from './submodules/occurrence-persistence/occurrence-persistence.module';

import { OccurrenceGenerationService } from './occurrence-generation.service';
import { OccurrenceFactory } from '../../factories/occurrence.factory';

@Module({
  imports: [
    InstallmentCalculationModule,
    OccurrenceDateModule,
    OccurrencePersistenceModule,
  ],
  controllers: [],
  providers: [OccurrenceGenerationService, OccurrenceFactory],
  exports: [
    InstallmentCalculationModule,
    OccurrenceDateModule,
    OccurrencePersistenceModule,
    OccurrenceGenerationService,
    OccurrenceFactory
  ]
})
export class OccurrenceGenerationModule { }
