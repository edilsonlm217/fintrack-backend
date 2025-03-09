import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

@ObjectType()
export class OccurrenceModel implements Occurrence {
  @Field(() => ID)
  id: string;

  @Field()
  due_date: string;

  @Field(() => Float)
  amount: number;

  @Field(() => OccurrenceStatus)
  status: OccurrenceStatus;
}
