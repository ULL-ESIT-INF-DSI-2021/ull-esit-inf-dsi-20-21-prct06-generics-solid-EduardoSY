import {Fighter, stats} from './fighter';
/**
 * Clase para definir un personaje de Star Wars
 */
export class StarWars extends Fighter {
  private universo: string = 'Star Wars';
  /**
   * Constructor de la clase Star Wars
   * @param nombre Nombre del personaje de Star Wars
   * @param peso Peso del personaje de Star Wars
   * @param altura Altura del personaje de  Star Wars
   * @param frase Frase/sonido personaje de del Star Wars
   * @param estadisticas Estadisticas personaje de del Star Wars
   */
  constructor(nombre: string, peso: number,
      altura: number, frase: string, estadisticas: stats) {
    super(nombre, peso, altura, frase, estadisticas);
  }
  /**
   * Getter -> Obtener universo al que pertenece el luchador (Star Wars)
   * @returns universo
   */
  getUniverso() {
    return this.universo;
  }
}