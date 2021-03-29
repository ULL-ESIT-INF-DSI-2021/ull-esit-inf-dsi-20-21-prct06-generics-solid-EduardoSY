import {Fighter, stats} from './fighter';
/**
 * Clase para definir un Marvel
 */
export class Marvel extends Fighter {
  private universo: string = 'Marvel';
  /**
   * Constructor de la clase Marvel
   * @param nombre Nombre del personaje de Marvel
   * @param peso Peso del personaje de Marvel
   * @param altura Altura del personaje de Marvel
   * @param frase Frase/sonido del personaje de Marvel
   * @param estadisticas Estadisticas del personaje de Marvel
   */
  constructor(nombre: string, peso: number,
      altura: number, frase: string, estadisticas: stats) {
    super(nombre, peso, altura, frase, estadisticas);
  }
  /**
   * Getter -> Obtener universo al que pertenece el luchador (Marvel)
   * @returns universo
   */
  getUniverso() {
    return this.universo;
  }
}