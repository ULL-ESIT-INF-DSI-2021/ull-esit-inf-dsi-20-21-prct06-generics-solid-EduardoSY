import {BasicStreamableCollection} from './basic';
/**
 * Tipo de dato que contiene los datos de una serie
 */
export type pelicula = {
  titulo: string;
  año: number;
  genero: string;
  clasificacion: number;
}
/**
 * Clase para representar a las peliculas
 * */
export class Peliculas extends BasicStreamableCollection<pelicula> {
  /**
   * Constructor de la clase que representa peliculas
   * @param peliculas Lista de peliculas
   */
  constructor(private peliculas: pelicula[]) {
    super(peliculas);
  }
  /**
   * Getter para el array de peliculas
   * @returns Array de peliculas
   */
  getElementos() {
    return this.peliculas;
  }
  /**
   * Funcion para buscar una serie en base a un parametro
   * @param parametro Parametro a buscar: titulo, año, etc.
   * @param valor Valor de ese parametro
   * @returns Array con las peliculas que coinciden
   */
  buscar(parametro: string, valor: string): pelicula[] {
    let resultado: pelicula[] = [];
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