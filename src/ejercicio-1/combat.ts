import {Fighter} from './fighter';
import {Pokemon} from './pokemon';
import {DragonBall} from './dragonball';
import {Marvel} from './marvel';
import {StarWars} from './starwars';
/**
 * Clase combate. Esta clase realiza el combate entre dos luchadores.
 */
export class Combat {
  private datoAtaque: number[] = new Array(2);
  /**
   * Contructor de la clase Combate. Instancia un combate
   * @param luchador1 Fighter 1
   * @param luchador2 Fighter 2
   */
  constructor(public readonly luchador1: Fighter,
    public readonly luchador2: Fighter) {}
  /**
   * Realiza el combate entre los luchadores
  */
  combatir() {
    this.calcularAtaques();
    console.log('COMBATE -> ' + this.luchador1.getNombre() + ' VS ' +
    this.luchador2.getNombre());
    let iterator: number = 1;
    while ((this.luchador1.getHPCombate() > 0) &&
      (this.luchador2.getHPCombate() > 0)) {
      console.log("\n -[ Ronda " + iterator + " ]-");
      if ((iterator % 2) == 0) {
        console.log(this.luchador2.getNombre() + ' dice: '+
        this.luchador2.getFrase());
        console.log(this.luchador2.getNombre() + " inflinje -" +
        this.datoAtaque[1] + " a " + this.luchador1.getNombre());
        this.luchador1.restarHP(this.datoAtaque[1]);
      } else {
        console.log(this.luchador1.getNombre() + ' dice: '+
        this.luchador1.getFrase());
        console.log(this.luchador1.getNombre() + " inflinje -" +
        this.datoAtaque[0] + " a " + this.luchador2.getNombre());
        this.luchador2.restarHP(this.datoAtaque[0]);
      }
      iterator++;
      console.log(this.luchador1.getNombre() + " [HP: " +
      +(this.luchador1.getHPCombate()).toFixed(2) + "] VS " +
      this.luchador2.getNombre() + " [HP: " +
      +(this.luchador2.getHPCombate()).toFixed(2) + "]");
    }
    if (this.luchador1.getHPCombate() <= 0) {
      return (this.luchador2.getNombre() + ' gana!');
    } else {
      return (this.luchador1.getNombre() + ' gana!');
    }
  }
  /**
   * Calcula el daño que hace un luchador al otro y viceversa.
   * Guarda esos datos en un array datoAtaque.
   */
  calcularAtaques() {
    this.datoAtaque[0] = this.calculoCombate(this.luchador1, this.luchador2);
    this.datoAtaque[1] = this.calculoCombate(this.luchador2, this.luchador1);
  }
  /**
   * Calcula el daño del ataque del pokemon 1 al pokemon 2 en funcion
   * de sus tipos y estadísticas.
   * @param tipo1 Tipo del pokemon 1
   * @param tipo2 Tipo del pokemon 2
   * @param ataque Ataque del pokemon 1
   * @param defensa Defensa del pokemon 2
   * @returns Daño inflingido del pokemon 1 al pokemon 2
   */
  calculoCombate(luch1: Fighter, luch2: Fighter): number {
    let universo1: string = luch1.getUniverso();
    let universo2: string = luch2.getUniverso();
    let ataque: number = luch1.getStats().attack;
    let defensa: number = luch2.getStats().def;
    let efectividad: number = 0; // Variable de efectividad del ataque
    if (universo1 === universo2) {
      if ((luch1 instanceof Pokemon)&&(luch2 instanceof Pokemon)) {
        let tipo1 = luch1.getTipo();
        let tipo2 = luch2.getTipo();
        if (tipo1 === tipo2) {
          efectividad = 0.5;
        } else if (tipo1 === 'Fuego') {
          switch (tipo2) {
            case 'Hierba':
              efectividad = 2;
              break;
            case 'Electrico':
              efectividad = 1;
              break;
            case 'Agua':
              efectividad = 0.5;
              break;
          }
        } else if (tipo1 === 'Agua') {
          switch (tipo2) {
            case ('Hierba'):
            case ('Electrico'):
              efectividad = 0.5;
              break;
            case 'Fuego':
              efectividad = 2;
              break;
          }
        } else if (tipo1 === 'Electrico') {
          switch (tipo2) {
            case ('Fuego'):
            case ('Hierba)'):
              efectividad = 1;
              break;
            case 'Agua':
              efectividad = 2;
              break;
          }
        } else {
          switch (tipo2) {
            case 'Electrico':
              efectividad = 1;
              break;
            case 'Agua':
              efectividad = 2;
              break;
            case 'Fuego':
              efectividad = 0.5;
              break;
          }
        }
      } else {
        efectividad = 1;
      }
    } else {
      if (universo1 == 'Pokemon') {
        switch (universo2) {
          case 'Dragon Ball':
            efectividad = 0.5;
            break;
          case 'Star Wars':
            efectividad = 1.5;
            break;
          case 'Marvel':
            efectividad = 1;
            break;
        }
      } else if (universo1 == 'Dragon Ball') {
        efectividad = 0.5;
      } else if (universo1 == 'Star Wars') {
        switch (universo2) {
          case 'Dragon Ball':
            efectividad = 0.5;
            break;
          case 'Pokemon':
            efectividad = 1;
            break;
          case 'Marvel':
            efectividad = 1;
            break;
        }
      } else if (universo1 == 'Marvel') {
        switch (universo2) {
          case 'Dragon Ball':
            efectividad = 0.5;
            break;
          case 'Pokemon':
            efectividad = 1;
            break;
          case 'Star Wars':
            efectividad = 1;
            break;
        }
      }
    }
    let damage: number = 50 * (ataque/defensa) * efectividad;
    return parseFloat(damage.toFixed(2));
  }
}