import { Module } from '@nestjs/common';
import { CommitmentService } from './commitment.service';
import { CreateModule } from './create/create.module';

@Module({
  imports: [CreateModule],
  controllers: [],
  providers: [CommitmentService],
  exports: [CommitmentService]
})
export class CommitmentModule { }
