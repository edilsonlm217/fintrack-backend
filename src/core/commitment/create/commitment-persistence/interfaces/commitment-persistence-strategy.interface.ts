import { Commitment } from "src/common/interfaces/commitment.interface";
import { CreateCommitmentDto } from "src/common/dto/create-commitment.dto";

export interface CommitmentPersistenceStrategy {
  process(createCommitmentDto: CreateCommitmentDto): Promise<Commitment>;
}
