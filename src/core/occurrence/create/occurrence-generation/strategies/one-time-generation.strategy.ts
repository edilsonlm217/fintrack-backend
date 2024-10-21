import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { CreateOccurrenceDtoFactory } from '../../../../../common/factories/create-occurrence-dto.factory';

@Injectable()
export class OneTimeGenerationStrategy implements GenerationStrategy {
  constructor() { }

  async process(commitment: Commitment): Promise<CreateOccurrenceDto[]> {
    const createOccurrenceDto = this.generateOneTimeOccurrence(commitment);
    return [createOccurrenceDto];
  }

  private generateOneTimeOccurrence(commitment: Commitment) {
    return CreateOccurrenceDtoFactory.createOccurrence(
      commitment,
      commitment.due_date,
      commitment.amount
    );
  }
}
