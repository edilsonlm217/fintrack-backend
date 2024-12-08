import { Injectable } from '@nestjs/common';
import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CreateOccurrenceDtoFactory } from '../../../../../../common/factories/create-occurrence-dto.factory';
import { GenerationStrategy } from '../interfaces/generation-strategy.interface';

/**
 * Strategy for generating occurrences for recurring commitments.
 * This strategy calculates the occurrences based on the due date and periodicity of the commitment.
 */
@Injectable()
export class RecurringGenerationStrategy implements GenerationStrategy {
  constructor(
    private readonly occurrenceDateService: OccurrenceDateService,
  ) { }

  /**
   * Processes a commitment to generate an array of occurrence DTOs for recurring commitments.
   *
   * @param commitment - The commitment containing details such as due date, amount, and periodicity.
   *
   * @returns A Promise that resolves to an array of CreateOccurrenceDto objects.
   */
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
