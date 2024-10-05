import { Injectable } from '@nestjs/common';
import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

@Injectable()
export class OneTimeOccurrenceStrategy implements OccurrenceStrategy {
  constructor(
    private readonly occurrenceRepository: OccurrenceRepository
  ) { }

  async process(commitment: Commitment): Promise<Occurrence[]> {
    const occurrence = await this.occurrenceRepository.insertOne({
      commitment_id: commitment._id,
      due_date: commitment.due_date,
      amount: commitment.amount,
      status: 'pendente',
    });

    return [occurrence];
  }
}
