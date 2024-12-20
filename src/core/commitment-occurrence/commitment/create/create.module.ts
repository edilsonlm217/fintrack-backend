import { Module } from '@nestjs/common';
import { CreateService } from './create.service';
import { CommitmentPersistenceModule } from './commitment-persistence/commitment-persistence.module';

@Module({
  imports: [CommitmentPersistenceModule],
  controllers: [],
  providers: [CreateService],
  exports: [CreateService]
})
export class CreateModule { }
