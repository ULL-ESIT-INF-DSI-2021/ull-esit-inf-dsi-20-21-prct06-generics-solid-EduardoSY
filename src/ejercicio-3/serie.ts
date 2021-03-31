import {BasicStreamableCollection} from './basic';
/**
 * Tipo de dato que contiene los datos de una serie
 */
export type serie = {
  titulo: string;
  año: number;
  temporadas: number;
  genero: string;
  clasificacion: number;
}
/**
 * Clase para representar a las series
 * */
export class Series extends BasicStreamableCollection<serie> {
  /**
   * Constructor de la clase que representa Series
   * @param series Lista de series
   */
  constructor(private series: serie[]) {
    super(series);
  }
  /**
   * Getter para el array de series
   * @returns Array de series
   */
  getElementos() {
    return this.series;
  }
  /**
   * Funcion para buscar una serie en base a un parametro
   * @param parametro Parametro a buscar: titulo, año, etc.
   * @param valor Valor de ese parametro
   * @returns Array con las series que coinciden
   */
  buscar(parametro: string, valor: string): serie[] {
    let resultado: serie[] = [];
    switch (parametro) {
      case ('titulo'):
        resultado = this.getElementos().filter((x) => (x.titulo == valor));
        break;
      case ('año'):
        resultado = this.getElementos().filter((x) => (x.año == +valor));
        break;
      case ('temporadas'):
        resultado = this.getElementos().filter((x) => (x.temporadas == +valor));
        break;
      case ('genero'):
        resultado = this.getElementos().filter((x) => (x.genero == valor));
        break;
      case ('clasificacion'):
        resultado = this.getElementos().filter((x) =>
          (x.clasificacion == +valor));
        break;
      default:
        console.log('Lo sentimos, no hemos encontrado nada');
    }
    return resultado;
  }
}