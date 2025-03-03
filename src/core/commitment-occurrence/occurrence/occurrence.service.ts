import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateService } from './create/create.service';

/**
 * Service responsible for handling operations related to occurrences, such as creation
 * and retrieval. It acts as a middle layer, delegating specific tasks to specialized
 * services like CreateService and FindService.
 */
@Injectable()
export class OccurrenceService {
  constructor(
    private readonly createService: CreateService,
  ) { }

  /**
   * Creates occurrences based on a given commitment.
   * 
   * @param commitment - The commitment for which occurrences will be created.
   * 
   * @returns A Promise that resolves to an array of Occurrence objects 
   * created for the specified commitment.
   */
  async create(commitment: Commitment): Promise<Occurrence[]> {
    return this.createService.process(commitment);
  }
}
