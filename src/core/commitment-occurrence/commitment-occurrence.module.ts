import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { CommitmentOccurrenceService } from './commitment-occurrence.service';
import { CommitmentStatsService } from './services/commitment-stats.service';
import { DateFormatterService } from './services/date-formatter.service';
import { CommitmentDataService } from './services/commitment-data/commitment-data.service';
import { CommitmentMapperService } from './services/commitment-mapper/commitment-mapper.service';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [
    CommitmentOccurrenceService,
    CommitmentStatsService,
    DateFormatterService,
    CommitmentDataService,
    CommitmentMapperService,
    CommitmentMapperService,
  ],
  exports: [CommitmentOccurrenceService]
})
export class CommitmentOccurrenceModule { }
