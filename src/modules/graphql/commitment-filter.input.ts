import { Field, InputType } from '@nestjs/graphql';
import { CommitmentType } from 'src/common/enums/commitment-type.enum';
import { CommitmentPeriodicity } from 'src/common/enums/commitment-periodicity.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { NumericFilter } from './numeric.-filter.input';

@InputType()
export class CommitmentFilter {
  @Field(() => CommitmentType, {
    nullable: true,
    description: `
      The type of the financial commitment. Determines the specific nature of the commitment.
      Possible values are:
      - 'recurring' for recurring commitments
      - 'one_time' for one-time commitments
      - 'installment' for installment commitments
    `
  })
  @IsEnum(CommitmentType)
  @IsOptional()
  type?: CommitmentType;

  @Field({
    nullable: true,
    description: 'A textual description of the commitment. Provides details about the nature of the commitment (e.g., "Payment for furniture purchase").'
  })
  @IsOptional()
  description?: string;

  @Field(() => NumericFilter, {
    nullable: true,
    description: 'Filter for the monetary amount associated with the commitment. This allows comparisons like equal, greater than, or less than.'
  })
  @IsOptional()
  amount?: NumericFilter;  // Usando o NumericFilter aqui

  @Field(() => CommitmentPeriodicity, {
    nullable: true,
    description: `
      The periodicity of the commitment. Defines how often a recurring commitment occurs.
      Possible values:
      - 'weekly': The commitment occurs once a week.
      - 'biweekly': The commitment occurs every 14 days.
      - 'monthly': The commitment occurs once a month.
      - 'quarterly': The commitment occurs every three months.
      - 'yearly': The commitment occurs once a year.
    `
  })
  @IsEnum(CommitmentPeriodicity)
  @IsOptional()
  periodicity?: CommitmentPeriodicity;

  @Field({
    nullable: true,
    description: 'The category of the commitment. Used to classify the commitment into broad categories (e.g., "Utilities", "Entertainment").'
  })
  @IsOptional()
  category?: string;

  @Field({
    nullable: true,
    description: 'The subcategory of the commitment. Optional and used for more specific classification within the main category (e.g., "Streaming Services").'
  })
  @IsOptional()
  subcategory?: string;
}
