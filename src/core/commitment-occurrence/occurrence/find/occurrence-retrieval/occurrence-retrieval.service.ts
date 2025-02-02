import { Injectable } from '@nestjs/common';
import { OccurrenceRepository } from 'src/database/neo4j/repositories/occurrence.repository';

@Injectable()
export class OccurrenceRetrievalService {
  constructor(private readonly occurrenceRepository: OccurrenceRepository) { }

  async findAllByMonth(userId: string, month: number, year: number) {
    return this.occurrenceRepository.findAllByMonth({ userId, month, year });
  }

  async findAllByDateRange(userId: string, startDate: string, endDate: string) {
    return this.occurrenceRepository.findAllByDateRange({ userId, startDate, endDate });
  }
}
