import { Injectable } from "@nestjs/common";
import { OccurrenceStatus } from "src/common/enums/occurrence-status.enum";

@Injectable()
export class CommitmentStatsService {
  // Método para calcular os totais pagos e pendentes
  calculateTotals(commitments: any[]) {
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

    return { totalPaidInMonth, totalPendingInMonth };
  }
}