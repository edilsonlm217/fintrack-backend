import { Injectable } from "@nestjs/common";

@Injectable()
export class DateFormatterService {
  // Método para formatar o mês e ano
  formatMonthYear(month: number, year: number): string {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${monthNames[month - 1]} ${year}`;
  }
}