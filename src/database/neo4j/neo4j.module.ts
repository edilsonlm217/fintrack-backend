import { Module } from '@nestjs/common';

import { createNeo4jConnection } from './config/neo4j.config';

import { CommitmentRepository } from './repositories/commitment.repository';
import { OccurrenceRepository } from './repositories/occurrence.repository';

@Module({
  providers: [
    {
      provide: 'NEO4J_CONNECTION',
      useFactory: createNeo4jConnection,
    },
    CommitmentRepository,
    OccurrenceRepository,
  ],
  exports: ['NEO4J_CONNECTION', CommitmentRepository, OccurrenceRepository],
})
export class Neo4jModule { }
