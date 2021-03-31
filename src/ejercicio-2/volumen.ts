import {isConvertible} from './isconvertible';
/**
 * Clase que implementa conversiones de volumen
 */
export class Volumen implements isConvertible<number> {
  private unidades: [string, number][] = [['litro', 1],
    ['metro cubico', 0.001], ['pie cubico', 0.0353147]];
  /**
   * Contructor de la clase de conversion de volumen
   * @param unidadInicio Unidad en la que se encuentra el valor
   * @param unidadFinal Unidad en la que queremos el valor
   */
  constructor(private readonly unidadInicio: string,
      private readonly unidadFinal: string) {}
  /**
   * Geter UnidadFinal
   * @returns unidadFinal
   */
  getUnidadFinal() {
    return this.unidadFinal;
  }
  /**
   * Getter UnidadInicio
   * @returns unidadInicio
   */
  getUnidadInicio() {
    return this.unidadInicio;
  }
  /**
   * Funcion que convierte entre unidades
   * @param cantidad Valor a convertir
   * @returns Valor ya convertido
   */
  convertir(cantidad: number): number {
    let unidad1 = this.unidades.filter(
        (x) => x[0] === this.unidadInicio);
    let unidad2 = this.unidades.filter(
        (x) => x[0] === this.unidadFinal);
    if ((unidad1.length != 1) || (unidad2.length != 1)) {
      throw new Error('Error detectado con las unidades');
    }
    let resultado = cantidad * (unidad2[0][1]/unidad1[0][1]);
    return +(resultado.toFixed(4));
  }
}
