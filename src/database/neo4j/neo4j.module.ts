import { Global, Module } from '@nestjs/common';

import { createNeo4jConnection } from './config/neo4j.config';

import { CommitmentRepository } from './repositories/commitment.repository';
import { OccurrenceRepository } from './repositories/occurrence.repository';
import { UserRepository } from './repositories/user.repository';

@Global()
@Module({
  providers: [
    {
      provide: 'NEO4J_CONNECTION',
      useFactory: createNeo4jConnection,
    },
    CommitmentRepository,
    OccurrenceRepository,
    UserRepository,
  ],
  exports: ['NEO4J_CONNECTION', CommitmentRepository, OccurrenceRepository, UserRepository],
})
export class Neo4jModule { }
