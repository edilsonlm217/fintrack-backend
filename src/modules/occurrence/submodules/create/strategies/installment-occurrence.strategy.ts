import { Injectable } from '@nestjs/common';

import { InstallmentCalculationService } from '../submodules/occurrence-generation/submodules/installmente-calculation/installment-calculation.service';
import { OccurrenceGenerationService } from '../submodules/occurrence-generation/occurrence-generation.service';
import { OccurrencePersistenceService } from '../submodules/occurrence-generation/submodules/occurrence-persistence/occurrence-persistence.service';

import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { InstallmentDetails } from '../submodules/occurrence-generation/submodules/installmente-calculation/interfaces/installment-details.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';

@Injectable()
export class InstallmentOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly installmentCalculationService: InstallmentCalculationService,
    private readonly occurrenceGenerationService: OccurrenceGenerationService,
    private readonly occurrencePersistenceService: OccurrencePersistenceService
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const installmentDetails = this.getInstallmentDetails(commitment);
    const occurrences = this.generateOccurrences(commitment, installmentDetails);
    return this.saveOccurrences(occurrences);
  }

  /**
   * Step 1: Retrieve installment details from the calculation service
   */
  private getInstallmentDetails(commitment: Commitment): InstallmentDetails { // Tipando o retorno da função
    return this.installmentCalculationService.calculateInstallmentDetails(commitment);
  }

  /**
   * Step 2: Generate occurrences using the provided installment details
   */
  private generateOccurrences(commitment: Commitment, installmentDetails: InstallmentDetails): CreateOccurrenceDto[] {
    const { baseInstallmentAmount, adjustmentAmount, remainingInstallments } = installmentDetails;
    return this.occurrenceGenerationService.generateInstallmentOccurrences(
      commitment,
      baseInstallmentAmount,
      adjustmentAmount,
      remainingInstallments
    );
  }

  /**
   * Step 3: Persist the generated occurrences in the database
   */
  private saveOccurrences(occurrences: CreateOccurrenceDto[]): Promise<Occurrence[]> {
    return this.occurrencePersistenceService.saveOccurrences(occurrences);
  }
}
