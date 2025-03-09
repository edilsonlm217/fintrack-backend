import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class NumericFilter {
  @Field(() => Float, { nullable: true })
  equals?: number;

  @Field(() => Float, { nullable: true })
  greaterThan?: number;

  @Field(() => Float, { nullable: true })
  lessThan?: number;
}
