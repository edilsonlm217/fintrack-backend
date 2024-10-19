import { Module } from '@nestjs/common';
import { CommitmentController } from './commitment.controller';
import { CommitmentService } from './commitment.service';
import { CreateModule } from './submodules/create/create.module';
import { OccurrenceModule } from '../occurrence/occurrence.module';

@Module({
  imports: [CreateModule, OccurrenceModule],
  controllers: [CommitmentController],
  providers: [CommitmentService],
  exports: [CommitmentService]
})
export class CommitmentModule { }
