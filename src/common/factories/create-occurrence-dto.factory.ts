import { v4 as uuidv4 } from 'uuid';  // Importando a função para gerar UUID
import { Commitment } from 'src/common/interfaces/commitment.interface';

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';

export class CreateOccurrenceDtoFactory {
  static createOccurrence(commitment: Commitment, occurrenceDate: string, amount: number): CreateOccurrenceDto {
    return {
      id: uuidv4(),
      commitment_id: commitment.id,
      due_date: occurrenceDate,
      amount,
      status: OccurrenceStatus.PENDING,
    };
  }
}
