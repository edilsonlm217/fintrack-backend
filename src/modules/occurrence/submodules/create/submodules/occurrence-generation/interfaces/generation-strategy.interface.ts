import { CreateOccurrenceDto } from "src/common/dto/create-occurrence.dto";
import { Commitment } from "src/common/interfaces/commitment.interface";

export interface GenerationStrategy {
  process(commitment: Commitment): Promise<CreateOccurrenceDto[]>;
}
