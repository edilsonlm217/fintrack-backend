import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { CommitmentOccurrenceService } from './commitment-occurrence.service';
import { CommitmentMapperService } from './services/commitment-mapper/commitment-mapper.service';
import { CommitmentStatsService } from './services/commitment-stats/commitment-stats.service';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [
    CommitmentOccurrenceService,
    CommitmentStatsService,
    CommitmentMapperService,
  ],
  exports: [CommitmentOccurrenceService]
})
export class CommitmentOccurrenceModule { }
