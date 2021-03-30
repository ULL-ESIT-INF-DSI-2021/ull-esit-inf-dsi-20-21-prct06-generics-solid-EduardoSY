export interface isConvertible<T> {
  getUnidadInicio():string;
  getUnidadFinal():string;
  convertir(cantidad: T): T;
}