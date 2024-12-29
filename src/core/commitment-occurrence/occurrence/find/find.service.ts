import { Injectable } from '@nestjs/common';
import { OccurrenceRetrievalService } from './occurrence-retrieval/occurrence-retrieval.service';

@Injectable()
export class FindService {
  constructor(private readonly ocurrenceRetrievalService: OccurrenceRetrievalService) { }

  async findAllByMonth(userId: string, month: number, year: number) {
    return this.ocurrenceRetrievalService.findAllByMonth(userId, month, year);
  }

  async findAllByDateRange(userId: string, startDate: string, endDate: string) {
    return this.ocurrenceRetrievalService.findAllByDateRange(userId, startDate, endDate);
  }
}
