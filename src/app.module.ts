import { Module } from '@nestjs/common';

import { CommitmentModule } from './modules/commitment/commitment.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './database/neo4j/neo4j.module';
import { GraphqlModule } from './modules/graphql/graphql.module';

@Module({
  imports: [
    Neo4jModule,
    CommitmentModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
