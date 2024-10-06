import { Commitment } from "src/common/interfaces/commitment.interface";
import { Occurrence } from "src/common/interfaces/occurrence.interface";

export interface OccurrenceStrategy {
  process(commitment: Commitment): Promise<Occurrence[]>;
}
