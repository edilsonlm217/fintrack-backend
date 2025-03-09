import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class DateRange {
  @Field()
  @IsOptional()
  start: string;

  @Field()
  @IsOptional()
  end: string;
}
