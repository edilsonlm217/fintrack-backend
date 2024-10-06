import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateService } from './submodules/create/create.service';

@Injectable()
export class OccurrenceService {
  constructor(private readonly createService: CreateService) { }

  async create(commitment: Commitment): Promise<Occurrence[]> {
    return this.createService.process(commitment);
  }
}
