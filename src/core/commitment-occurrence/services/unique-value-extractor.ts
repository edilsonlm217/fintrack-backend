export class UniqueValueExtractor {
  /**
   * Extrai valores únicos de um campo específico de um array de objetos.
   * 
   * @param array - O array de objetos de onde os valores serão extraídos.
   * @param key - O nome do campo pelo qual os valores únicos serão extraídos.
   * @returns Um array com os valores únicos encontrados no campo especificado.
   */
  static extractUniqueValues<T>(array: T[], key: keyof T): any[] {
    return Array.from(new Set(array.map(item => item[key])));
  }
}