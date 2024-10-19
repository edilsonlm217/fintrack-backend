import { Injectable } from '@nestjs/common';

import { OccurrencePersistenceService } from '../submodules/occurrence-generation/submodules/occurrence-persistence/occurrence-persistence.service';

import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

import { OccurrenceFactory } from '../factories/occurrence.factory';

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';

@Injectable()
export class OneTimeOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrencePersistenceService: OccurrencePersistenceService,
    private readonly occurrenceFactory: OccurrenceFactory,
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const createOccurrenceDto = this.createOccurrenceDto(commitment);
    const occurrence = await this.saveOccurrence(createOccurrenceDto);
    return [occurrence];
  }

  private createOccurrenceDto(commitment: Commitment) {
    return this.occurrenceFactory.createOccurrence(
      commitment,
      commitment.due_date,
      commitment.amount
    );
  }

  private async saveOccurrence(createOccurrenceDto: CreateOccurrenceDto): Promise<Occurrence> {
    return this.occurrencePersistenceService.saveOccurrence(createOccurrenceDto);
  }
}
