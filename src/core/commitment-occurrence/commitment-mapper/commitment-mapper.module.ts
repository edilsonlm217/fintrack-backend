import { Module } from '@nestjs/common';
import { CommitmentMapperService } from './commitment-mapper.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CommitmentMapperService],
  exports: [CommitmentMapperService]
})
export class CommitmentMapperModule { }
