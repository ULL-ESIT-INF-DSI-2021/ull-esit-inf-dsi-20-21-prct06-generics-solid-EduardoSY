# Práctica 6 - Clases e interfaces genéricas. Principios SOLID
* Elaborado por Eduardo Da Silva Yanes

## 1. Introducción
En esta sexta práctica vamos a profundizar en el uso de clases abtractas y genéricas así como interfaces. Durante todo el desarrollo de este ejercicio vamos a procurar aplicar los principios S y O de SOLID. En caso de que querramos saber más sobre estos principios podemos visitar esta página sobre [los principios SOLID de Typescript](https://samueleresca.net/solid-principles-using-typescript/). 

Además de lo previamente mencionado vamos a trabajar con Instanbul (y de manera opcional con Coveralls). Gracias a Instanbul podremos tener una métrica de cuánto código hemos cubierto con nuestras pruebas mediant el desarrollo TDD. Para conocer más sobre Instanbul podemos revisar [la página oficial de Instanbul](https://istanbul.js.org/).

Coveralls es opcional debido a que, para una cuenta estandar, no es posible trackear un repositorio privado. Es por esto que, para poder utilizar la herramienta debemos hacer público nuestro repositorio. Si quieremos probar esta herramienta (cosa recomendable) lo haremos una vez haya pasado la fecha de entrega.

## 2. Pasos previos
Antes de comenzar con el desarrollo de código fuente vamos a generar nuestra estructura de trabajo. Tanto en la práctica pasada como en esta y todas las posteriores seguirán la misma estructura. Tendremos un directorio **/src**. En este directorio crearemos otros **subdirectorios**, uno por cada ejercicio, donde almacenamos el código de cada uno de ellos. Estos subdirectorios siguen la nomenclatura de **ejercicio-X**.

Además, debemos tener instalado (al igual la práctica anterior) Typedoc, Mocha y Chai. A estas herramientas vamos a añaadir una nueva: Instanbul.
En caso de que no sepamos cómo instalar/utilizar alguna de estas herramientas podemos acceder a su página oficial o a los siguientes tutoriales proporcionados por el profesor:
- [Tutorial Typedoc (Solo alumnos ULL)](https://drive.google.com/file/d/19LLLCuWg7u0TjjKz9q8ZhOXgbrKtPUme/view)
- [Tutorial Mocha y Chai (Solo alumnos ULL)](https://drive.google.com/file/d/1-z1oNOZP70WBDyhaaUijjHvFtqd6eAmJ/view)
- [Tutorial Instanbul (Solo alumnos ULL)](https://drive.google.com/file/d/1xLDc4CpoYpsAlCFO_4DMwu7MKCtcZDnh/view)

## 3. Desarrollo de los ejercicios

### Ejercicio 1. - El Combate definitivo

Partimos del código desarrollado en la práctica anterior. En primer lugar se nos pide desarrollar una clase abstracta denominada `Fighter`. Esta será la superclase que será heredada por cada uno de los distintos tipos de combatientes.

Primero declaramos un tipo de dato denominado `stats` donde almacenamos la vida, el ataque, la defensa y la velocidad.

En cuanto a la clase `Fighter` tenemos 6 atributos: el nombre, apellido, peso, altura, las estadisticas y la vida durante el combate. Como funciones tenemos 7 getters (un getter para cada parámetro) y una función, `restarHP`, cuyo objetivo es ir restando el daño recibido a la vida del combate. Vemos que tenemos un getter como método abstracto, `getUniverso()`. Esto nos permite que podamos "sobreescribir" el método en las clases derivada, evitando así tener que desarrollarlo aquí.

```typescript
export type stats = {
  hpMax: number,
  attack: number,
  def: number,
  speed: number
}

export abstract class Fighter {
  private hpCombate: number = 0;

  constructor(private readonly nombre: string, private readonly peso: number,
    private readonly altura: number, private readonly frase: string,
    private readonly estadisticas: stats) {
    this.hpCombate = estadisticas.hpMax;
  }
  restarHP(damage: number) {
    this.hpCombate -= damage;
  }
  getNombre() {
    return this.nombre;
  }
  getPeso() {
    return this.peso;
  }
  getAltura() {
    return this.altura;
  }
  getHPCombate() {
    return this.hpCombate;
  }
  getStats() {
    return this.estadisticas;
  }
  getFrase() {
    return this.frase;
  }
  abstract getUniverso(): string;
}
```
A partir de esta clase `Fighter` vamos a desarrollar las clases para cada uno de los combatientes, a partir de sus universos. En nuestro caso hemos decidido crear las clases `Marvel`, `Pokemon`, `Star Wars` y `Dragon Ball`.

Mostremos como ejemplo la clase `Pokemon`.

```typescript
import {Fighter, stats} from './fighter';
export class Pokemon extends Fighter {
  private universo: string = 'Pokemon';
  constructor(nombre: string, private readonly tipo: string, peso: number,
      altura: number, frase: string, estadisticas: stats) {
    super(nombre, peso, altura, frase, estadisticas);
  }
  getUniverso() {
    return this.universo;
  }
  getTipo() {
    return this.tipo;
  }
}
```
Como podemos observar ahora si definimos el getter `getUniverso()`. Todas las clases son practicamente idénticas. La única algo más diferente es **Pokemon** ya que en esta además de los valores generales de nombre, peso, altura, etc. añadimos el tipo, cosa que los otros luchadores no tienen.

La siguiente clase que trataremos es `Combat`, la que nos permitirá realizar una lucha entre distintos combatientes.
Esta clase es muy parecida a la de la práctica anterior. Casi no ha sufrido cambios.

Estos Combates se instancian recibiendo dos luchadores. Con la función `calcularAtaques` calculamos el daño que hace el luchador A al luchador B y viceversa. Estos valores de daño los guardamos en un array privado de la clase. 

Los valores de daño no son aleatorios. Los calculamos gracias a la función `calculoCombate` que, gracias a las estadísticas y universo al que pertenece cada luchador podemos hacer un cálculo de cuán efectivos son sus ataques.

Finalmente tenemos `combatir`, la función que no permite que nuestros luchadores se maten entre ellos. Hacemos que los luchadores se ataquen alternativamente por rondas hasta que la vida de uno de ellos llegue a 0. En ese punto devolvemos un mensaje indicanto quién ha ganado. Como novedad tenemos que, antes de cada ataque, cada luchador dice su frase característica.

```typescript
export class Combat {
  private datoAtaque: number[] = new Array(2);

  constructor(public readonly luchador1: Fighter,
    public readonly luchador2: Fighter) {}

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

  calcularAtaques() {
    this.datoAtaque[0] = this.calculoCombate(this.luchador1, this.luchador2);
    console.log('A 2 B > ' + this.datoAtaque[0]);
    this.datoAtaque[1] = this.calculoCombate(this.luchador2, this.luchador1);
    console.log('B 2 A > ' + this.datoAtaque[1]);
  }
  
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
```

La última clase de la que vamos a hablar es de `Fighterdex`, una evolución de la clase de la práctica anterior `Pokedex`. En este caso, en lugar de simplemente almacenar Pokemon, podemos almacenar personajes de cualquier universo.

La estructura se mantiene respecto a la práctica anterior. Tenemos un array de luchadores que sirve como Database así como funciones para manipularlo.

- `addFighter` nos permite añadir un nuevo luchador a este sistema. Simplemente hacemos un push al array con nuestro nuevo luchador.
- `delFighter` nos da la opción de eliminar un combatente. Lo que hacemos es buscar dentro de la base de datos al combatiente en cuestión. En caso de no encontrarlo nos devuelve un mensaje de error. Si está el luchador, con la función splice lo eliminamos.
- `buscarLuchador` nos permite saber si tenemos un luchador o no en nuestra base de datos. Iteramos el array en busca del peleador. Si este se encuentra devolvemos la posición. Si no lo tenemos, devolvemos null. 
- `fighterdexSize` nos permite saber la cantidad de peleadores tenemos guardados.

```typescript
export class Fighterdex {
  constructor(private dataBase: Fighter[]) {};

  public addFighter(luchador: Fighter) {
    this.dataBase.push(luchador);
  }

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

  public fighterdexSize(): number {
    return this.dataBase.length;
  }

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
```