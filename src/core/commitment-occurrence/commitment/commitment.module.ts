import { Module } from '@nestjs/common';
import { CommitmentController } from '../../../modules/commitment/commitment.controller';
import { CommitmentService } from './commitment.service';
import { CreateModule } from './create/create.module';
import { FindModule } from './find/find.module';

@Module({
  imports: [CreateModule, FindModule],
  controllers: [CommitmentController],
  providers: [CommitmentService],
  exports: [CommitmentService]
})
export class CommitmentModule { }
