import { v4 as uuidv4 } from 'uuid';  // Importando a função para gerar UUID

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';

export class CreateOccurrenceDtoFactory {
  static createOccurrence(occurrenceDate: string, amount: number): CreateOccurrenceDto {
    return {
      id: uuidv4(),
      due_date: occurrenceDate,
      amount,
      status: OccurrenceStatus.PENDING,
    };
  }
}
