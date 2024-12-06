import { Commitment } from 'src/common/interfaces/commitment.interface';

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';

export class CreateOccurrenceDtoFactory {
  static createOccurrence(commitment: Commitment, occurrenceDate: string, amount: number): CreateOccurrenceDto {
    return {
      commitment_id: commitment._id,
      user_id: commitment.user_id,
      due_date: occurrenceDate,
      amount,
      status: OccurrenceStatus.PENDING,
    };
  }
}
