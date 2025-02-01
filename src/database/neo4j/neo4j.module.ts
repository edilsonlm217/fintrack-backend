import { Module } from '@nestjs/common';
import neo4j from 'neo4j-driver';

import { CommitmentRepository } from './repositories/commitment.repository';
import { OccurrenceRepository } from './repositories/occurrence.repository';

@Module({
  providers: [
    {
      provide: 'NEO4J_CONNECTION',
      useFactory: async () => {
        try {
          // Conexão com o Neo4j Aura DB
          const driver = neo4j.driver(
            'neo4j+s://ab5a4c6a.databases.neo4j.io',
            neo4j.auth.basic('neo4j', 'SvG65w9wC1KpgkW1UlZMdbyV30qeXIoWI2qDdS6zvcw')
          );

          await driver.getServerInfo();

          return driver;
        } catch (error) {
          throw new Error('Failed to establish connection with Neo4j. Shutting down application.');
        }
      },
    },
    CommitmentRepository,
    OccurrenceRepository,
  ],
  exports: ['NEO4J_CONNECTION', CommitmentRepository, OccurrenceRepository],
})
export class Neo4jModule { }
