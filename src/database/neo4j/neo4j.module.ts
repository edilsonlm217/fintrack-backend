import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createNeo4jDriver } from './neo4j.factory';
import { CommitmentRepository } from './repositories/commitment.repository';
import { OccurrenceRepository } from './repositories/occurrence.repository';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'NEO4J_DRIVER',
      useFactory: async (configService: ConfigService) => {
        return createNeo4jDriver(configService);
      },
      inject: [ConfigService],
    },
    CommitmentRepository,
    OccurrenceRepository,
  ],
  exports: [
    'NEO4J_DRIVER',
    CommitmentRepository,
    OccurrenceRepository,
  ],
})
export class Neo4jModule { }
