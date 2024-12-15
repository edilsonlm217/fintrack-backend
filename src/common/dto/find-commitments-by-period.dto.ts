import { IsInt, Min, Max, IsUUID, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { DateTime } from 'luxon';

export class FindCommitmentsByPeriodDto {
  private static CURRENT_YEAR = DateTime.now().year;

  /**
   * The ID of the user. This should be a valid UUID (v4).
   */
  @IsUUID('4')  // Ensures the userId is a valid UUID (v4)
  userId: string;

  /**
   * The month for which commitments should be retrieved.
   * Must be an integer between 1 and 12 (inclusive).
   */
  @Type(() => Number)  // Converts the value to a number
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  /**
   * The year for which commitments should be retrieved.
   * Must be an integer. The minimum year is 2 years prior to the current year,
   * and the maximum year is 2 years into the future.
   */
  @Type(() => Number)  // Converts the value to a number
  @IsInt()
  @Min(FindCommitmentsByPeriodDto.CURRENT_YEAR - 2) // Minimum: 2 years ago
  @Max(FindCommitmentsByPeriodDto.CURRENT_YEAR + 2) // Maximum: 2 years in the future
  year: number;
}
