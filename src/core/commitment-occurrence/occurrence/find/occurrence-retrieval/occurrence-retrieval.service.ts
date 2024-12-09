import { Injectable } from '@nestjs/common';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';

@Injectable()
export class OccurrenceRetrievalService {
  constructor(private readonly occurrenceRepository: OccurrenceRepository) { }

  async findByDateRange(userId: string, month: number, year: number) {
    return this.occurrenceRepository.findByDateRange({
      userId,
      month,
      year,
    });
  }
}
