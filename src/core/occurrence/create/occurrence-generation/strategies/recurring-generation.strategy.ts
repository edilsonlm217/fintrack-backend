import { Injectable } from '@nestjs/common';
import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CreateOccurrenceDtoFactory } from '../../../../../common/factories/create-occurrence-dto.factory';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';

@Injectable()
export class RecurringGenerationStrategy implements GenerationStrategy {
  constructor(
    private readonly occurrenceDateService: OccurrenceDateService,
  ) { }

  async process(commitment: Commitment): Promise<CreateOccurrenceDto[]> {
    const { due_date: dueDate, amount: monthlyAmount, periodicity } = commitment;
    const numberOfOccurrences = this.occurrenceDateService.getTotalOccurrencesForPeriodicity(periodicity);

    return Array.from({ length: numberOfOccurrences }, (_, i) => {
      const occurrenceDate = this.occurrenceDateService.calculateOccurrenceDate({
        startDateString: dueDate,
        occurrenceIndex: i,
        periodicity,
      }).toISODate();

      return CreateOccurrenceDtoFactory.createOccurrence(
        commitment,
        occurrenceDate,
        monthlyAmount
      );
    });
  }
}
