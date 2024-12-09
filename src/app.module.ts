import { Module } from '@nestjs/common';

import { MongoModule } from './database/mongo.module';
import { CommitmentModule } from './modules/commitment/commitment.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongoModule,
    CommitmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
