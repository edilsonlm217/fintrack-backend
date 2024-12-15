import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { CommitmentOccurrenceService } from './commitment-occurrence.service';
import { CommitmentMapperService } from './commitment-mapper/commitment-mapper.service';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [
    CommitmentOccurrenceService,
    CommitmentMapperService,
  ],
  exports: [CommitmentOccurrenceService]
})
export class CommitmentOccurrenceModule { }
