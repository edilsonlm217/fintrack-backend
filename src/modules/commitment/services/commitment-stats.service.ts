import { Injectable } from "@nestjs/common";
import { OccurrenceStatus } from "src/common/enums/occurrence-status.enum";
import { CommitmentWithOccurrences } from "src/common/interfaces/commitments-with-occurrences.interface";

@Injectable()
export class CommitmentStatsService {
  // Método para calcular os totais pagos e pendentes
  calculateTotals(commitments: CommitmentWithOccurrences[]) {
    const totalPaidInMonth = commitments.reduce((sum, commitment) => {
      const totalPaid = commitment.occurrences.filter(occurrence => occurrence.status === OccurrenceStatus.PAID)
        .reduce((sum, occurrence) => sum + occurrence.amount, 0);
      return sum + totalPaid;
    }, 0);

    const totalPendingInMonth = commitments.reduce((sum, commitment) => {
      const totalPending = commitment.occurrences.filter(occurrence => occurrence.status === OccurrenceStatus.PENDING)
        .reduce((sum, occurrence) => sum + occurrence.amount, 0);
      return sum + totalPending;
    }, 0);

    const totalCommitments = commitments.length;

    return { totalPaidInMonth, totalPendingInMonth, totalCommitments };
  }
}