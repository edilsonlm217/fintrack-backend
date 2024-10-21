import { Module } from '@nestjs/common';
import { CommitmentController } from './commitment.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [CommitmentController],
  providers: [],
  exports: []
})
export class CommitmentModule { }
