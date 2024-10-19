import { Commitment } from "src/common/interfaces/commitment.interface";
import { CreateCommitmentDto } from "../../../../../common/dto/create-commitment.dto";

export interface CommitmentStrategy {
  process(createCommitmentDto: CreateCommitmentDto): Promise<Commitment>;
}
