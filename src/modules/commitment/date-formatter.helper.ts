export class DateFormatterHelper {
  /**
   * Retorna os nomes dos meses no idioma especificado.
   * @param locale Locale (ex: "pt-BR", "en-US")
   * @returns Array com os nomes dos meses
   */
  static getMonthNames(locale: string = 'pt-BR'): string[] {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => {
      const monthName = formatter.format(new Date(2000, i));
      return monthName.charAt(0).toUpperCase() + monthName.slice(1);
    });
  }

  /**
   * Retorna o mês e ano formatados.
   * @param month Mês (1 a 12)
   * @param year Ano
   * @param locale Locale (ex: "pt-BR", "en-US")
   * @returns Ex: "Julho 2024"
   */
  static formatMonthYear(month: number, year: number, locale: string = 'pt-BR'): string {
    const monthNames = this.getMonthNames(locale);
    if (month < 1 || month > 12) {
      throw new Error('O mês deve estar entre 1 e 12.');
    }
    return `${monthNames[month - 1]} ${year}`;
  }
}
