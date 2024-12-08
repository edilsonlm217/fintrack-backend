import { Module } from '@nestjs/common';

import { OccurrenceGenerationModule } from './occurrence-generation/occurrence-generation.module';
import { OccurrencePersistenceModule } from './occurrence-persistence/occurrence-persistence.module';

import { CreateService } from './create.service';

@Module({
  imports: [OccurrenceGenerationModule, OccurrencePersistenceModule],
  controllers: [],
  providers: [CreateService],
  exports: [CreateService]
})
export class CreateModule { }
