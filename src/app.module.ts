import { Module } from '@nestjs/common';

import { MongoModule } from './database/mongo/mongo.module';
import { Neo4jModule } from './database/neo4j/neo4j.module';
import { CommitmentModule } from './modules/commitment/commitment.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongoModule,
    Neo4jModule,
    CommitmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
