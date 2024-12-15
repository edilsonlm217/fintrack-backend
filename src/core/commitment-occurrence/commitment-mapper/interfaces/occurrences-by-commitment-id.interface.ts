import { Occurrence } from "src/common/interfaces/occurrence.interface";

export type OccurrencesByCommitmentId = Record<string, Omit<Occurrence, 'commitment_id'>[]>;