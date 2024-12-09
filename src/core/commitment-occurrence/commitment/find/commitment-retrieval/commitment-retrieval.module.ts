import { Module } from '@nestjs/common';
import { CommitmentRetrievalService } from './commitment-retrieval.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CommitmentRetrievalService],
  exports: [CommitmentRetrievalService]
})
export class CommitmentRetrievalModule { }
