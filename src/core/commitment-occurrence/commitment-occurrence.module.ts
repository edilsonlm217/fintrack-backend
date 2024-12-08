import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { CommitmentOccurrenceService } from './commitment-occurrence.service';
import { CommitmentStatsService } from './commitment-stats.service';
import { DateFormatterService } from './date-formatter.service';
import { CommitmentDataService } from './commitment-data.service';
import { CommitmentMapperService } from './commitment-mapper.service';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [
    CommitmentOccurrenceService,
    CommitmentStatsService,
    DateFormatterService,
    CommitmentDataService,
    CommitmentMapperService
  ],
  exports: [CommitmentOccurrenceService]
})
export class CommitmentOccurrenceModule { }
