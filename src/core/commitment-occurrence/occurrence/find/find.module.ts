import { Module } from '@nestjs/common';
import { FindService } from './find.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FindService],
  exports: [FindService]
})
export class FindModule { }
