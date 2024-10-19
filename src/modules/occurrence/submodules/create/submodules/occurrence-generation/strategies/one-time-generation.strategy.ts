import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceFactory } from '../../../factories/occurrence.factory';

@Injectable()
export class OneTimeGenerationStrategy implements GenerationStrategy {
  constructor(
    private readonly occurrenceFactory: OccurrenceFactory,
  ) { }

  async process(commitment: Commitment): Promise<CreateOccurrenceDto[]> {
    const createOccurrenceDto = this.generateOneTimeOccurrence(commitment);
    return [createOccurrenceDto];
  }

  generateOneTimeOccurrence(commitment: Commitment) {
    return this.occurrenceFactory.createOccurrence(
      commitment,
      commitment.due_date,
      commitment.amount
    );
  }
}
