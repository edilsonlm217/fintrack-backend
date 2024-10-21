import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';

import { OccurrencePersistenceService } from './occurrence-persistence/occurrence-persistence.service';
import { OccurrenceGenerationService } from './occurrence-generation/occurrence-generation.service';

@Injectable()
export class CreateService {
  constructor(
    private readonly occurrenceGenerationService: OccurrenceGenerationService,
    private readonly occurrencePersistenceService: OccurrencePersistenceService,
  ) { }

  async process(commitment: Commitment) {
    const occurrencesToBePersisted = await this.occurrenceGenerationService.process(commitment);
    const occurrences = await this.occurrencePersistenceService.saveOccurrences(occurrencesToBePersisted);
    return occurrences;
  }
}
