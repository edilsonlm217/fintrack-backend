import { Injectable } from '@nestjs/common';

import { OccurrenceDateService } from '../submodules/occurrence-date/occurrence-date.service';

import { OccurrenceStrategy } from '../interfaces/create-strategy.interface';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { OccurrenceRepository } from 'src/database/repositories/occurrence.repository';
import { OccurrenceStatus } from 'src/common/enums/occurrence-status.enum';

import { InstallmentHelper } from '../helpers/installment.helper';

@Injectable()
/**
 * Strategy for processing installment-based occurrences.
 * 
 * This class implements the `OccurrenceStrategy` interface and is responsible for
 * generating occurrence records for commitments that are paid in installments.
 * 
 * The installment occurrences are calculated based on the commitment's total amount, 
 * the number of installments, and the due date for each installment.
 */
export class InstallmentOccurrenceStrategy implements OccurrenceStrategy {

  constructor(
    private readonly occurrenceDateService: OccurrenceDateService,
    private readonly occurrenceRepository: OccurrenceRepository,
  ) { }

  /**
   * Processes a commitment and generates the corresponding installment occurrences.
   * 
   * @param commitment - The commitment object containing information about the installments.
   * @returns A promise that resolves to an array of Occurrence objects.
   */
  async process(commitment: Commitment): Promise<Occurrence[]> {
    const baseInstallmentAmount = this.calculateBaseInstallmentAmount(commitment);
    const adjustmentAmount = this.calculateAdjustmentAmount(commitment, baseInstallmentAmount);
    const remainingInstallments = this.calculateRemainingInstallments(commitment);

    const occurrences: CreateOccurrenceDto[] = [];

    for (let i = 0; i < remainingInstallments; i++) {
      const occurrenceDate = this.calculateOccurrenceDate(commitment, i);
      const installmentAmount = this.calculateInstallmentAmount(i, remainingInstallments, baseInstallmentAmount, adjustmentAmount);

      const occurrence = this.createOccurrence(commitment, occurrenceDate, installmentAmount);
      occurrences.push(occurrence);
    }

    return this.saveOccurrences(occurrences);
  }

  /**
   * Calculates the base installment amount for the commitment.
   * 
   * @param commitment - The commitment object.
   * @returns The base installment amount.
   */
  private calculateBaseInstallmentAmount(commitment: Commitment): number {
    return InstallmentHelper.calculateBaseInstallmentAmount({
      totalAmount: commitment.amount,
      totalInstallments: commitment.installments,
    });
  }

  /**
   * Calculates the adjustment amount to distribute any rounding differences across installments.
   * 
   * @param commitment - The commitment object.
   * @param baseInstallmentAmount - The base installment amount calculated.
   * @returns The adjustment amount.
   */
  private calculateAdjustmentAmount(commitment: Commitment, baseInstallmentAmount: number): number {
    return InstallmentHelper.calculateAdjustmentAmount({
      totalAmount: commitment.amount,
      baseInstallmentAmount: baseInstallmentAmount,
      totalInstallments: commitment.installments,
    });
  }

  /**
   * Calculates the number of remaining installments for the commitment.
   * 
   * @param commitment - The commitment object.
   * @returns The number of remaining installments.
   */
  private calculateRemainingInstallments(commitment: Commitment): number {
    return InstallmentHelper.calculateRemainingInstallments({
      currentInstallment: commitment.current_installment,
      totalInstallments: commitment.installments,
    });
  }

  /**
   * Calculates the due date for a given installment occurrence based on its index and the commitment's due date.
   * 
   * @param commitment - The commitment object.
   * @param occurrenceIndex - The index of the occurrence.
   * @returns The calculated occurrence date as a string.
   */
  private calculateOccurrenceDate(commitment: Commitment, occurrenceIndex: number): string {
    return this.occurrenceDateService.calculateOccurrenceDate({
      startDateString: commitment.due_date,
      occurrenceIndex,
      periodicity: commitment.periodicity,
    }).toISODate();
  }

  /**
   * Calculates the installment amount for a specific occurrence based on its index.
   * 
   * @param index - The index of the occurrence.
   * @param remainingInstallments - The total remaining installments.
   * @param baseInstallmentAmount - The base installment amount.
   * @param adjustmentAmount - The adjustment amount for rounding.
   * @returns The installment amount for this occurrence.
   */
  private calculateInstallmentAmount(
    index: number,
    remainingInstallments: number,
    baseInstallmentAmount: number,
    adjustmentAmount: number,
  ): number {
    return InstallmentHelper.calculateInstallmentAmount({
      index,
      remainingInstallments,
      baseInstallmentAmount,
      adjustmentAmount,
    });
  }

  /**
   * Creates an occurrence DTO based on the commitment, occurrence date, and amount.
   * 
   * @param commitment - The commitment object.
   * @param occurrenceDate - The calculated occurrence date.
   * @param amount - The amount for the occurrence.
   * @returns A CreateOccurrenceDto object representing the occurrence.
   */
  private createOccurrence(commitment: Commitment, occurrenceDate: string, amount: number): CreateOccurrenceDto {
    return {
      commitment_id: commitment._id,
      due_date: occurrenceDate,
      amount: amount,
      status: OccurrenceStatus.PENDING,
    };
  }

  /**
   * Saves an array of occurrences to the repository.
   * 
   * @param occurrences - The array of CreateOccurrenceDto objects to be saved.
   * @returns A promise that resolves to an array of Occurrence objects.
   */
  private saveOccurrences(occurrences: CreateOccurrenceDto[]): Promise<Occurrence[]> {
    return this.occurrenceRepository.insertMany(occurrences);
  }
}
