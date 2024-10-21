import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [],
  exports: [CommitmentModule, OccurrenceModule]
})
export class CoreModule { }
