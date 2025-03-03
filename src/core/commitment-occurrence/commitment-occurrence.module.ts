import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { CommitmentOccurrenceService } from './commitment-occurrence.service';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [
    CommitmentOccurrenceService,
  ],
  exports: [CommitmentOccurrenceService]
})
export class CommitmentOccurrenceModule { }
