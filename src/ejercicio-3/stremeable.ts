/**
 * Interfaz Stremeable
 */
export interface Stremeable<T> {
  addElement(nuevoElemento: T): void;
  getElementos(): T[];
}