import { Injectable } from '@nestjs/common';

import { OccurrenceDateService } from '../submodules/occurrence-generation/submodules/occurrence-date/occurrence-date.service';
import { OccurrenceGenerationService } from '../submodules/occurrence-generation/occurrence-generation.service';

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { OccurrencePersistenceService } from '../submodules/occurrence-generation/submodules/occurrence-persistence/occurrence-persistence.service';
import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';

export interface RecurringDetails {
  dueDate: string; // ou Date, dependendo do formato que você está utilizando
  monthlyAmount: number;
  periodicity: CommitmentPeriodicity; // Ajuste o tipo conforme o que você usa para periodicidade
  numberOfOccurrences: number;
}

@Injectable()
export class RecurringOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrenceGenerationService: OccurrenceGenerationService,
    private readonly occurrenceDateService: OccurrenceDateService,
    private readonly occurrencePersistenceService: OccurrencePersistenceService
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const recurringDetails = this.getRecurringDetails(commitment);
    const occurrences = this.generateOccurrences(commitment, recurringDetails);
    return this.saveOccurrences(occurrences);
  }

  private getRecurringDetails(commitment: Commitment) {
    const dueDate = commitment.due_date;
    const monthlyAmount = commitment.amount;
    const periodicity = commitment.periodicity;
    const numberOfOccurrences = this.occurrenceDateService.getTotalOccurrencesForPeriodicity(periodicity);

    return { dueDate, monthlyAmount, periodicity, numberOfOccurrences };
  }

  private generateOccurrences(commitment: Commitment, recurringDetails: RecurringDetails): CreateOccurrenceDto[] {
    const { dueDate, monthlyAmount, numberOfOccurrences, periodicity } = recurringDetails;
    return this.occurrenceGenerationService.generateRecurringOccurrences(commitment, dueDate, monthlyAmount, periodicity, numberOfOccurrences);
  }

  private saveOccurrences(occurrences: CreateOccurrenceDto[]): Promise<Occurrence[]> {
    return this.occurrencePersistenceService.saveOccurrences(occurrences);
  }
}
