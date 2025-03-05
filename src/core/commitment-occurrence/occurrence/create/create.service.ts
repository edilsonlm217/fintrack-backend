import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';

import { OccurrencePersistenceService } from './occurrence-persistence/occurrence-persistence.service';
import { OccurrenceGenerationService } from './occurrence-generation/occurrence-generation.service';

/**
 * Service responsible for processing the creation of occurrences
 * based on financial commitments. It coordinates the generation and
 * persistence of occurrences through respective services.
 */
@Injectable()
export class CreateService {
  constructor(
    private readonly occurrenceGenerationService: OccurrenceGenerationService,
    private readonly occurrencePersistenceService: OccurrencePersistenceService,
  ) { }

  /**
   * Processes a commitment to generate and save occurrences.
   *
   * @param commitment - The commitment for which occurrences will be generated.
   *
   * @returns A Promise that resolves to an array of persisted Occurrence objects.
   */
  async process(commitment: Commitment) {
    const occurrencesToBePersisted = await this.occurrenceGenerationService.process(commitment);
    return this.occurrencePersistenceService.saveOccurrences(commitment.id, occurrencesToBePersisted);
  }
}
