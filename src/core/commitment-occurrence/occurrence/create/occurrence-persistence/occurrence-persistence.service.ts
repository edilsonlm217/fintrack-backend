import { Injectable } from '@nestjs/common';

import { OccurrenceRepository } from 'src/database/neo4j/repositories/occurrence.repository';

import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';

@Injectable()
export class OccurrencePersistenceService {
  constructor(private readonly occurrenceRepository: OccurrenceRepository) { }

  async saveOccurrences(commitmentId: string, occurrences: CreateOccurrenceDto[]): Promise<Occurrence[]> {
    return this.occurrenceRepository.insertMany(commitmentId, occurrences);
  }
}
