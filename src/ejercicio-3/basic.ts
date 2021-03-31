import {StremeableSearch} from './stremeablesearch';
/**
 * Clase que define una coleccion stremeable y con posibilidad de busqueda
 */
export abstract class BasicStreamableCollection<T> implements
  StremeableSearch<T> {
  /**
   * Constructor de la clase
   * @param lista Lista que compone la coleccion
   */
  constructor(protected lista: T[]) {};
  /**
   * Metodo para añadir elemento a la coleccion
   * @param nuevoElemento Elemento a añadir
   */
  addElement(nuevoElemento: T) {
    this.lista.push(nuevoElemento);
  }
  /**
   * Getter. Debería devolver la lista de la coleccion
   */
  abstract getElementos(): T[];

  /**
   * Metodo de busqueda. Debería buscar los elementos de la coleccion que
   * tengan el valor buscado dentro de una categoria
   * @param parametro Categoria a buscar
   * @param valor Valor a buscar
   */
  abstract buscar(parametro: string, valor: string): T[];
}