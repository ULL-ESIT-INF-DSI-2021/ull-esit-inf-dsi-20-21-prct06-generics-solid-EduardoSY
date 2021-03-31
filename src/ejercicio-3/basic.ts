import {StremeableSearch} from './stremeablesearch';

export abstract class BasicStreamableCollection<T> implements
  StremeableSearch<T> {
  constructor(protected lista: T[]) {};

  addElement(nuevoElemento: T) {
    this.lista.push(nuevoElemento);
  }
  abstract getElementos(): T[];

  abstract buscar(parametro: string, valor: string): T[];
}