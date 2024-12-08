import { Module } from '@nestjs/common';
import { CommitmentModule } from './commitment/commitment.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { CommitmentOccurrenceService } from './commitment-occurrence.service';
import { CommitmentStatsService } from './commitment-stats.service';
import { DateFormatterService } from './date-formatter.service';

@Module({
  imports: [CommitmentModule, OccurrenceModule],
  controllers: [],
  providers: [CommitmentOccurrenceService, CommitmentStatsService, DateFormatterService],
  exports: [CommitmentOccurrenceService]
})
export class CommitmentOccurrenceModule { }
