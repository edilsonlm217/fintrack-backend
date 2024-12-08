import { Module } from '@nestjs/common';
import { OccurrencePersistenceService } from './occurrence-persistence.service';

@Module({
    imports: [],
    controllers: [],
    providers: [OccurrencePersistenceService],
    exports: [OccurrencePersistenceService]
})
export class OccurrencePersistenceModule { }
