import { Module } from '@nestjs/common';
import { CommitmentOccurrenceModule } from './commitment-occurrence/commitment-occurrence.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommitmentOccurrenceModule, UserModule],
  controllers: [],
  providers: [],
  exports: [CommitmentOccurrenceModule, UserModule]
})
export class CoreModule { }
