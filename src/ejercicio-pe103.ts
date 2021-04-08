/* Ejercicio PE-103
Alumno: Eduardo Da Silva Yanes - alu0101104911
*/

/*
Este es el output de Instanbul:
src                 |     100 |      100 |     100 |     100 |
 ejercicio-pe103.ts |     100 |      100 |     100 |     100 |
*/

/**
 * Interface tipo Generica para implementar una
 * pila tipo LIFO
 */
interface LifoInterface<T> {
    push(elemento: T): void;
    pop(): void;
    pseek(): T;
    size(): number;
    print(): void;
}

/**
 * Clase para implementar la pila Lifo
 */
export class Lifo<T> implements LifoInterface<T> {
  /**
   * Constructor de la clase
   * @param arrayLifo Array que hara la funcion de pila
   */
  constructor(private arrayLifo: T[]) {}

  /**
   * Getter para obtener la pila (array)
   * @returns arrayLifo
   */
  getArrayLifo(): T[] {
    return this.arrayLifo;
  }

  /**
   * Hace un push del elemento a la pila
   * @param elemento Elemento a incluir en el top de la pila
   */
  push(elemento: T): void {
    this.arrayLifo.push(elemento);
  }

  /**
   * Elimina el último elemento en ser incluido en la pila
   * (Last in, first out)
   */
  pop():void {
    this.arrayLifo.splice(this.arrayLifo.length - 1, 1);
  }

  /**
   * Devuelve el último elemento en ser incluido en la pila pero sin eliminarlo
   * @returns Ultimo elemento en incluirse a la pila
   */
  pseek(): T {
    return this.arrayLifo[this.arrayLifo.length - 1];
  }

  /**
   * Obtiene el tamaño actual de la pila
   * @returns Tamaño de la pila
   */
  size(): number {
    return this.arrayLifo.length;
  }

  /** Muestra el contenido de la pila. En este caso
   * lo muestro desde el top hasta el fondo de la pila
  */
  print(): void {
    console.log('--- Printing from top to bottom ---');
    for (let index = this.arrayLifo.length - 1; index >= 0; index--) {
      console.log(this.arrayLifo[index]);
    }
  }
}

const Lifo2 = new Lifo<number>([1, 2, 3, 4]);
Lifo2.print();
Lifo2.pop();
Lifo2.print();