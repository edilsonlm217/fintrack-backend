import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';
import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';
import { OccurrenceModel } from './occurrence.model';
import { Commitment } from 'src/common/interfaces/commitment.interface';

@ObjectType()
export class CommitmentModel implements Commitment {
  @Field(() => ID)
  id: string;

  @Field(() => CommitmentType)
  type: CommitmentType;

  @Field()
  description: string;

  @Field(() => Float)
  amount: number;

  @Field({ nullable: true })
  due_date?: string;

  @Field({ nullable: true })
  start_date?: string;

  @Field({ nullable: true })
  end_date?: string;

  @Field(() => CommitmentPeriodicity, { nullable: true })
  periodicity?: CommitmentPeriodicity;

  @Field({ nullable: true })
  installments?: number;

  @Field({ nullable: true })
  current_installment?: number;

  @Field()
  category: string;

  @Field({ nullable: true })
  subcategory?: string;

  @Field(() => [OccurrenceModel], { nullable: true })
  occurrences?: OccurrenceModel[];
}
