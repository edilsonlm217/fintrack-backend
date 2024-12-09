import { Injectable } from '@nestjs/common';
import { OccurrenceRetrievalService } from './occurrence-retrieval/occurrence-retrieval.service';

@Injectable()
export class FindService {
  constructor(private readonly ocurrenceRetrievalService: OccurrenceRetrievalService) { }

  async findByDateRange(userId: string, month: number, year: number) {
    return this.ocurrenceRetrievalService.findByDateRange(userId, month, year);
  }
}
