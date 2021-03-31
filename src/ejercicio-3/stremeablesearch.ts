import {Stremeable} from './stremeable';
/**
 * Interfaz StremeableSearch
 * Esta interfaz extiende Stremeable para cumplir el principio S de SOLID
 */
export interface StremeableSearch<T> extends Stremeable<T> {
  buscar(parametro: string, valor: string): T[];
}