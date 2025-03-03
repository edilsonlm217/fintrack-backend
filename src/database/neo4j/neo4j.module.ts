import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createNeo4jDriver } from './neo4j.factory';

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
  ],
  exports: ['NEO4J_DRIVER'],
})
export class Neo4jModule { }
