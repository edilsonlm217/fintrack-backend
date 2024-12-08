import { Global, Module } from '@nestjs/common';
import { CommitmentOccurrenceModule } from './commitment-occurrence/commitment-occurrence.module';

@Module({
  imports: [CommitmentOccurrenceModule],
  controllers: [],
  providers: [],
  exports: [CommitmentOccurrenceModule]
})
export class CoreModule { }
