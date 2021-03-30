import {Fighter} from './fighter';
/**
 * Clase que aloja una database con luchadores
 */
export class Fighterdex {
  /**
   * Constructor de la clase
   * @param dataBase Array con los luchadores
   */
  constructor(private dataBase: Fighter[]) {};
  /**
   * Permite añadir luchadores
   * @param luchador Luchador a añadir
   */
  public addFighter(luchador: Fighter) {
    this.dataBase.push(luchador);
  }
  /**
   * Permite eliminar luchador
   * @param luchador Luchador a eliminar
   */
  public delFighter(luchador: Fighter) {
    let pos: number = -1;
    this.dataBase.forEach((iter) => {
      if (iter === luchador) {
        pos = this.dataBase.indexOf(iter);
      }
    });
    if (pos == -1) {
      console.log('Imposible eliminar. Luchador no encontrado');
    } else {
      this.dataBase.splice(pos, 1);
    }
  };
  /**
   * Tamaño de la base de datos
   * @returns size database
   */
  public fighterdexSize(): number {
    return this.dataBase.length;
  }
  /**
   * Permite buscar un luchador
   * @param luchador Luchador a buscar
   * @returns Posicion en la database. Null is no es encontrado
   */
  public buscarLuchador(luchador: Fighter) {
    let pos: number = -1;
    this.dataBase.forEach((iter) => {
      if (iter === luchador) {
        pos = this.dataBase.indexOf(iter);
      }
    });
    if (pos == -1) {
      return null;
    } else {
      return this.dataBase[pos];
    }
  }
};