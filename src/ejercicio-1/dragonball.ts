import {Fighter, stats} from './fighter';
/**
 * Clase para definir un personaje de Dragon Ball
 */
export class DragonBall extends Fighter {
  private universo: string = 'Dragon Ball';
  /**
   * Constructor de la clase Dragon Ball
   * @param nombre Nombre del personaje de Dragon Ball
   * @param peso Peso del personaje de Dragon Ball
   * @param altura Altura del personaje de  Dragon Ball
   * @param frase Frase/sonido personaje de del Dragon Ball
   * @param estadisticas Estadisticas personaje de del Dragon Ball
   */
  constructor(nombre: string, peso: number,
      altura: number, frase: string, estadisticas: stats) {
    super(nombre, peso, altura, frase, estadisticas);
  }
  /**
   * Getter -> Obtener universo al que pertenece el luchador (Dragon Ball)
   * @returns universo
   */
  getUniverso() {
    return this.universo;
  }
}