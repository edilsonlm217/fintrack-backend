import { Field, InputType } from '@nestjs/graphql';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';
import { DateRange } from './date-range.input';
import { IsEnum, IsOptional } from 'class-validator';
import { NumericFilter } from './numeric.-filter.input';

@InputType()
export class OccurrenceFilter {
  @Field(() => OccurrenceStatus, { nullable: true })
  @IsEnum(OccurrenceStatus)
  @IsOptional()
  status?: OccurrenceStatus;

  @Field(() => NumericFilter, {
    nullable: true,
    description: 'Filter for the monetary amount associated with the occurrence. This allows comparisons like equal, greater than, or less than.'
  })
  @IsOptional()
  amount?: NumericFilter;

  @Field(() => DateRange, { nullable: true })
  @IsOptional()
  due_date_range?: DateRange;
}
