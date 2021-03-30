import {isConvertible} from './isconvertible';

export class Fuerza implements isConvertible<number> {
  private unidades: [string, number][] = [['newton', 1],
    ['kilopondio', 0.101972]];
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
 let test = new Fuerza('kilopondio', 'newton');
 console.log(test.convertir(10));