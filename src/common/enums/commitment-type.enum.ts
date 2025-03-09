import { registerEnumType } from '@nestjs/graphql';

/**
 * Enum representing different types of financial commitments.
 */
export enum CommitmentType {
  /**
   * A recurring commitment, such as subscriptions or monthly bills.
   */
  RECURRING = 'recurring',

  /**
   * An installment commitment, such as purchases made with multiple credit card payments.
   */
  INSTALLMENT = 'installment',

  /**
   * A one-time commitment, such as a single purchase or a one-time payment.
   */
  ONE_TIME = 'one_time',
}

registerEnumType(CommitmentType, {
  name: 'CommitmentType',
});
