import { Module } from '@nestjs/common';
import { FindService } from './find.service';
import { OccurrenceRetrievalModule } from './occurrence-retrieval/occurrence-retrieval.module';

@Module({
  imports: [OccurrenceRetrievalModule],
  controllers: [],
  providers: [FindService],
  exports: [FindService]
})
export class FindModule { }
