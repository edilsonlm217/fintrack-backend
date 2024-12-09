import { Module } from '@nestjs/common';
import { OccurrenceRetrievalService } from './occurrence-retrieval.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OccurrenceRetrievalService],
  exports: [OccurrenceRetrievalService]
})
export class OccurrenceRetrievalModule { }
