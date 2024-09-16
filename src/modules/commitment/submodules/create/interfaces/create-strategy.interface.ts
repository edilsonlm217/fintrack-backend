import { Commitment } from "src/common/interfaces/commitment.interface";
import { CreateCommitmentDto } from "../../../dto/create-commitment.dto";

export interface CommitmentStrategy {
  process(createCommitmentDto: CreateCommitmentDto): Promise<Commitment>;
}
