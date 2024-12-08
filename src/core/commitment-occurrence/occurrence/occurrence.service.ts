import { Injectable } from '@nestjs/common';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateService } from './create/create.service';
import { FindService } from './find/find.service';

/**
 * Service responsible for handling operations related to occurrences, such as creation
 * and retrieval. It acts as a middle layer, delegating specific tasks to specialized
 * services like CreateService and FindService.
 */
@Injectable()
export class OccurrenceService {
  constructor(
    private readonly createService: CreateService,
    private readonly findService: FindService,
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

  /**
   * Retrieves occurrences for a user within a specific date range.
   * 
   * This method utilizes the FindService to query occurrences based on the user's ID,
   * the month, and the year provided as input.
   * 
   * @param userId - The ID of the user whose occurrences need to be fetched.
   * @param month - The month for filtering occurrences.
   * @param year - The year for filtering occurrences.
   * @returns A Promise resolving to an array of occurrences within the specified range.
   */
  async findByDateRange(userId: string, month: number, year: number): Promise<Occurrence[]> {
    return this.findService.findByDateRange(userId, month, year);
  }
}
