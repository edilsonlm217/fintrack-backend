import { Injectable } from '@nestjs/common';

import { OccurrencePersistenceService } from '../submodules/occurrence-generation/submodules/occurrence-persistence/occurrence-persistence.service';
import { OccurrenceGenerationService } from '../submodules/occurrence-generation/occurrence-generation.service';

import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';

@Injectable()
export class OneTimeOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrencePersistenceService: OccurrencePersistenceService,
    private readonly occurrenceGenerationService: OccurrenceGenerationService,
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const createOccurrenceDto = this.occurrenceGenerationService.generateOneTimeOccurrence(commitment);
    const occurrence = await this.saveOccurrence(createOccurrenceDto);
    return [occurrence];
  }

  private async saveOccurrence(createOccurrenceDto: CreateOccurrenceDto): Promise<Occurrence> {
    return this.occurrencePersistenceService.saveOccurrence(createOccurrenceDto);
  }
}
