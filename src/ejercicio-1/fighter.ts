/**
 * Tipo de dato que contiene las estadisticas del luchador
 */
export type stats = {
  hpMax: number,
  attack: number,
  def: number,
  speed: number
}

/**
 * Clase abstracta para definir a los luchadores
 */
export abstract class Fighter {
  private hpCombate: number = 0;
  /**
   * Constructor de la clase Fighter
   * @param nombre Nombre del luchador
   * @param peso Peso del luchador
   * @param altura Altura del luchador
   * @param frase Frase caracteristica del luchador
   * @param estadisticas Array con las estadisticas (hp, attk, def, speed)
   */
  constructor(private readonly nombre: string, private readonly peso: number,
    private readonly altura: number, private readonly frase: string,
    private readonly estadisticas: stats) {
    this.hpCombate = estadisticas.hpMax;
  }
  /**
   * Getter para el nomnbre
   * @returns nombre
   */
  getNombre() {
    return this.nombre;
  }
  /**
   * Getter para el peso
   * @returns peso
   */
  getPeso() {
    return this.peso;
  }
  /**
   * Getter para la altura
   * @returns altura
   */
  getAltura() {
    return this.altura;
  }
  /**
   * Getter hp del combate
   * @returns hpCombate
   */
  getHPCombate() {
    return this.hpCombate;
  }
  /**
   * Getter para el array de estadisticas
   * @returns estadisticas
   */
  getStats() {
    return this.estadisticas;
  }
  /**
   * Getter para obtener la frase del luchador
   * @returns frase
   */
  getFrase() {
    return this.frase;
  }
}