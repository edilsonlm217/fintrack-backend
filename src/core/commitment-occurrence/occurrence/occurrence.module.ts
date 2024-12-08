import { Module } from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { CreateModule } from './create/create.module';
import { FindModule } from './find/find.module';

@Module({
  imports: [CreateModule, FindModule],
  controllers: [],
  providers: [OccurrenceService],
  exports: [OccurrenceService]
})
export class OccurrenceModule { }
