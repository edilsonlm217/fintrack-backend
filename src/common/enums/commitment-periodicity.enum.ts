import { registerEnumType } from "@nestjs/graphql";

/**
 * Enum representing the different periodicities for financial commitments.
 * Used to define the frequency at which a commitment is repeated.
 */
export enum CommitmentPeriodicity {
  /**
   * Indicates that the commitment recurs weekly.
   * The commitment should occur once a week.
   */
  WEEKLY = 'weekly',

  /**
   * Indicates that the commitment recurs biweekly.
   * The commitment should occur every 14 days.
   */
  BIWEEKLY = 'biweekly',

  /**
   * Indicates that the commitment recurs monthly.
   * The commitment should occur once a month.
   */
  MONTHLY = 'monthly',

  /**
   * Indicates that the commitment recurs quarterly.
   * The commitment should occur every three months.
   */
  QUARTERLY = 'quarterly',

  /**
   * Indicates that the commitment recurs yearly.
   * The commitment should occur once a year.
   */
  YEARLY = 'yearly',
}

registerEnumType(CommitmentPeriodicity, {
  name: 'CommitmentPeriodicity',
});
