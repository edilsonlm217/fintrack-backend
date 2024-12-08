import { Module } from '@nestjs/common';

import { MongoModule } from './database/mongo.module';
import { CommitmentModule } from './modules/commitment/commitment.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    MongoModule,
    CommitmentModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
