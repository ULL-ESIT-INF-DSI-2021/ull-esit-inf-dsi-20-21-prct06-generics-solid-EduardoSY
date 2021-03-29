import {Fighter, stats} from './fighter';
/**
 * Clase para definir un Pokemon
 */
export class Pokemon extends Fighter {
  private universo: string = 'Pokemon';
  /**
   * Constructor de la clase Pokemon
   * @param nombre Nombre del pokemon
   * @param tipo Tipo del pokemon
   * @param peso Peso del pokemon
   * @param altura Altura del pokemon
   * @param frase Frase/sonido del Pokemon
   * @param estadisticas Estadisticas del pokemon
   */
  constructor(nombre: string, private readonly tipo: string, peso: number,
      altura: number, frase: string, estadisticas: stats) {
    super(nombre, peso, altura, frase, estadisticas);
  }
  /**
   * Getter -> Obtener universo al que pertenece el luchador (Pokemon)
   * @returns universo
   */
  getUniverso() {
    return this.universo;
  }
  /**
   * Getter -> Obtener el tipo del pokemon
   * @returns tipo
   */
  getTipo() {
    return this.tipo;
  }
}