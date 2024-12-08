import { Module } from '@nestjs/common';
import { CommitmentService } from './commitment.service';
import { CreateModule } from './create/create.module';
import { FindModule } from './find/find.module';

@Module({
  imports: [CreateModule, FindModule],
  controllers: [],
  providers: [CommitmentService],
  exports: [CommitmentService]
})
export class CommitmentModule { }
