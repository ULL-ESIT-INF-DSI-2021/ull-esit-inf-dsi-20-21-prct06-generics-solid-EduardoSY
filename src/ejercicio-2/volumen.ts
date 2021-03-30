import {isConvertible} from './isconvertible';

export class Volumen implements isConvertible<number> {
  private unidades: [string, number][] = [['litro', 1],
    ['metro cubico', 0.001], ['pie cubico', 0.0353147]];
  constructor(private readonly unidadInicio: string,
      private readonly unidadFinal: string) {}
  getUnidadFinal() {
    return this.unidadFinal;
  }
  getUnidadInicio() {
    return this.unidadInicio;
  }
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
 let test = new Volumen('pie cubico', 'litro');
 console.log(test.convertir(10));