import { Injectable } from '@nestjs/common';

import { Commitment } from 'src/common/interfaces/commitment.interface';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { CreateOccurrenceDtoFactory } from '../../../../../common/factories/create-occurrence-dto.factory';

/**
 * Strategy for generating a one-time occurrence based on a commitment.
 * This strategy implements the GenerationStrategy interface and provides
 * a method to process a commitment and create a single occurrence DTO.
 */
@Injectable()
export class OneTimeGenerationStrategy implements GenerationStrategy {
  constructor() { }

  /**
   * Processes the commitment and generates a one-time occurrence DTO.
   *
   * @param commitment - The commitment object containing details for the occurrence.
   * @returns A promise that resolves to an array containing the one-time occurrence DTO.
   */
  async process(commitment: Commitment): Promise<CreateOccurrenceDto[]> {
    const createOccurrenceDto = this.generateOneTimeOccurrence(commitment);
    return [createOccurrenceDto];
  }

  /**
   * Generates a one-time occurrence DTO for the given commitment.
   *
   * @param commitment - The commitment object used to create the occurrence DTO.
   * @returns The generated CreateOccurrenceDto object.
   */
  private generateOneTimeOccurrence(commitment: Commitment) {
    return CreateOccurrenceDtoFactory.createOccurrence(
      commitment,
      commitment.due_date,
      commitment.amount
    );
  }
}
