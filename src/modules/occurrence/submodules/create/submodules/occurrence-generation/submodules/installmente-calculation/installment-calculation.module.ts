import { Module } from '@nestjs/common';
import { InstallmentCalculationService } from './installment-calculation.service';
import { OccurrenceCalculationService } from './services/occurrence.calculation.service';

@Module({
  imports: [],
  controllers: [],
  providers: [InstallmentCalculationService, OccurrenceCalculationService],
  exports: [InstallmentCalculationService]
})
export class InstallmentCalculationModule { }
