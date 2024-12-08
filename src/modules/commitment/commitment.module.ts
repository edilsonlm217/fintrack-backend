import { Module } from '@nestjs/common';
import { CommitmentController } from './commitment.controller';

@Module({
  imports: [],
  controllers: [CommitmentController],
  providers: [],
  exports: []
})
export class CommitmentModule { }
