import { CreateOccurrenceDto } from "src/common/dto/create-occurrence.dto";
import { Commitment } from "src/common/interfaces/commitment.interface";

/**
 * Interface representing a strategy for generating occurrences based on a commitment.
 * Implementations of this interface must define the process for creating occurrence DTOs.
 */
export interface GenerationStrategy {
  /**
   * Processes a commitment and generates an array of occurrence DTOs.
   *
   * @param commitment - The commitment object containing details for the occurrence.
   * @returns A promise that resolves to an array of CreateOccurrenceDto objects.
   */
  process(commitment: Commitment): Promise<CreateOccurrenceDto[]>;
}
