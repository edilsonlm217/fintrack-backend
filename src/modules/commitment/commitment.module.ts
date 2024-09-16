import { Module } from '@nestjs/common';
import { CommitmentController } from './commitment.controller';
import { CommitmentService } from './commitment.service';
import { CreateModule } from './submodules/create/create.module';

@Module({
  imports: [CreateModule],
  controllers: [CommitmentController],
  providers: [CommitmentService],
  exports: [CommitmentService]
})
export class CommitmentModule { }
