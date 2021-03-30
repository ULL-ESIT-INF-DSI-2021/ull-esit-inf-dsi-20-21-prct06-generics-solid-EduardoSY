import {isConvertible} from './isconvertible';

export class Temperatura implements isConvertible<number> {
  private unidades: [string, number][] = [['celcius', 0], ['kelvin', 273.15]];
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
    let resultado: number = 0;
    if ((unidad1.length != 1) || (unidad2.length != 1)) {
      throw new Error('Error detectado con las unidades');
    } else {
      if((unidad1[0][0] == 'celcius') && (unidad2[0][0] == 'kelvin')) {
        resultado = cantidad + unidad2[0][1];
      } else {
        resultado = cantidad - unidad1[0][1];
      }
    }
    return +(resultado.toFixed(4));
  }
}
 let test = new Temperatura('kelvin', 'celcius');
 console.log(test.convertir(10));