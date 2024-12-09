import { Module } from '@nestjs/common';
import { CommitmentRetrievalModule } from './commitment-retrieval/commitment-retrieval.module';
import { FindService } from './find.service';

@Module({
  imports: [CommitmentRetrievalModule],
  controllers: [],
  providers: [FindService],
  exports: [FindService]
})
export class FindModule { }
