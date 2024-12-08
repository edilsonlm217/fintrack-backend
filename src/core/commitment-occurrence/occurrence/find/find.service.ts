import { Injectable } from '@nestjs/common';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

@Injectable()
export class FindService {
  constructor(private readonly occurrenceRepository: OccurrenceRepository) { }

  async findByDateRange(userId: string, month: number, year: number): Promise<Occurrence[]> {
    return this.occurrenceRepository.findByDateRange({
      userId,
      month,
      year,
    });
  }
}
