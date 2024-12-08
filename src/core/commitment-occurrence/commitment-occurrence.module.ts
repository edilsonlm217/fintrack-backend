import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { CommitmentOccurrenceService } from './commitment-occurrence.service';
import { CommitmentStatsService } from '../../modules/commitment/services/commitment-stats.service';
import { CommitmentMapperService } from './services/commitment-mapper/commitment-mapper.service';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [
    CommitmentOccurrenceService,
    CommitmentStatsService,
    CommitmentMapperService,
    CommitmentMapperService,
  ],
  exports: [CommitmentOccurrenceService]
})
export class CommitmentOccurrenceModule { }
