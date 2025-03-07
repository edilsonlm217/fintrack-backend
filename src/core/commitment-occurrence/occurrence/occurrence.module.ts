import { Module } from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { CreateModule } from './create/create.module';

@Module({
  imports: [CreateModule],
  controllers: [],
  providers: [OccurrenceService],
  exports: [OccurrenceService]
})
export class OccurrenceModule { }
