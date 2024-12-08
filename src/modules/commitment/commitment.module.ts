import { Module } from '@nestjs/common';
import { CommitmentController } from './commitment.controller';
import { CoreModule } from 'src/core/core.module';
import { CommitmentStatsService } from './services/commitment-stats.service';

@Module({
  imports: [CoreModule],
  controllers: [CommitmentController],
  providers: [CommitmentStatsService],
  exports: []
})
export class CommitmentModule { }
