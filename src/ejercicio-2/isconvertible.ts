/**
 * Interfaz que nos permite hacer la conversion de unidades
 */
export interface isConvertible<T> {
  getUnidadInicio():string;
  getUnidadFinal():string;
  convertir(cantidad: T): T;
}