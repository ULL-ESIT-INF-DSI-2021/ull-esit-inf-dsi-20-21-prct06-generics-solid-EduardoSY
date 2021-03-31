import {BasicStreamableCollection} from './basic';
/**
 * Tipo de dato que contiene los datos de una serie
 */
export type documental = {
  titulo: string;
  año: number;
  genero: string;
  duracion: number;
}
/**
 * Clase para representar a las documentales
 * */
export class Documentales extends BasicStreamableCollection<documental> {
  /**
   * Constructor de la clase que representa documentales
   * @param documentales Lista de documentales
   */
  constructor(private documentales: documental[]) {
    super(documentales);
  }
  /**
   * Getter para el array de documentales
   * @returns Array de documentales
   */
  getElementos() {
    return this.documentales;
  }
  /**
   * Funcion para buscar una serie en base a un parametro
   * @param parametro Parametro a buscar: titulo, año, etc.
   * @param valor Valor de ese parametro
   * @returns Array con las documentales que coinciden
   */
  buscar(parametro: string, valor: string): documental[] {
    let resultado: documental[] = [];
    switch (parametro) {
      case ('titulo'):
        resultado = this.getElementos().filter((x) => (x.titulo == valor));
        break;
      case ('año'):
        resultado = this.getElementos().filter((x) => (x.año == +valor));
        break;
      case ('genero'):
        resultado = this.getElementos().filter((x) => (x.genero == valor));
        break;
      case ('duracion'):
        resultado = this.getElementos().filter((x) =>
          (x.duracion == +valor));
        break;
      default:
        console.log('Lo sentimos, no hemos encontrado nada');
    }
    return resultado;
  }
}