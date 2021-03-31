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

-**[Acceso a la documentación generada con Typedoc](./docum/index.html)**

### Ejercicio 1. - El Combate definitivo

- [Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct06-generics-solid-EduardoSY/tree/master/src/ejercicio-1)
- [Acceso a los tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct06-generics-solid-EduardoSY/blob/master/tests/ejercicio-1.spec.ts)

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

Para saber qué pruebas se han realizado puedes acceder al [fichero de pruebas del ejercicio 1](). EEEDIITAARR.

FOTO EJECUCION

## Ejercicio 2. - Conversor de unidades

- [Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct06-generics-solid-EduardoSY/tree/master/src/ejercicio-2)
- [Acceso a los tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct06-generics-solid-EduardoSY/blob/master/tests/ejercicio-2.spec.ts)

Lo primero que se nos pide para este ejercicio es crear una interfaz genérica. Esa interfaz es `isConvertible`. Aquí indicamos 2 getters y un método `convertir`. La idea de los getters es conocer en qué sistema está el valor que hemos introducido y en qué sistema queremos transformarlo. `Convertir` será el método que haga los cálculos oportunos. 

Al tratarse de una interfaz debemos implementar cada uno de estos métodos en las clases.

```typescript
export interface isConvertible<T> {
  getUnidadInicio():string;
  getUnidadFinal():string;
  convertir(cantidad: T): T;
}
```

Ahora debemos crear clases para cada tipo de conversión: fuerza, longitud, masa, temperatura, tiempo, velocidad y volumen.

Todas estas clases son practicamente idénticas asi que la explicación la haré con `Longitud`, por ejemplo.

Cuando creamos un objeto tipo Longitud (o cualquier otro) debemos indicar mediante un string la unidad en la que se encuentra el valor y a qué unidad queremos transformarlo.

Dentro de las clases vemos que tenemos un array de pares privado denominado **unidades**. En este array tenemos las equivalencias entre unidades, siendo una de ellas la unidad base. En este ejemplo tenemos como unidad base al metro.

En cuanto a los métodos tenemos:
- `getUnidadFinal` y `getUnidadInicial` son getters que nos permiten saber los sistemas de unidades con los que vamos a trabajar
- `convertir` nos permite, dado un valor numérico, cambiarlo de sistema de unidades. Lo primero es obtener de dentro de nuestras opciones almacenadas en el array **unidades**, con qué unidades vamos a trabajar. En caso de que no encontremos la unidad dentro de nuestra "base de datos" lanzamos un mensaje de error". Si todo ha salido bien multiplicamos hacemos la operación `let resultado = cantidad * (unidad2[0][1]/unidad1[0][1]);`. Formateamos de tal manera que solo tenga 4 decimales como máximo y devolvemos el resultado como un número.

  La única clase diferente es `Temperatura` ya que la forma de convertir es distinta. En lugar de hacer la operación previamente mencionada, lo único que tenemos que hacer es sumar o restar (para pasar de Celcius a Kelvin o viceversa.)

```typescript
export class Longitud implements isConvertible<number> {
  private unidades: [string, number][] = [['metros', 1],
    ['millas', 0.000621371192], ['pies', 3.28084]];

  constructor(private readonly unidadInicio: string,
      private readonly unidadFinal: string) {}

  getUnidadFinal() {
    return this.unidadFinal;
  }
  getUnidadInicio() {
    return this.unidadInicio;
  }
  convertir(cantidad: number): number {
    let unidad1 = this.unidades.filter(
        (x) => x[0] === this.unidadInicio);
    let unidad2 = this.unidades.filter(
        (x) => x[0] === this.unidadFinal);
    if ((unidad1.length != 1) || (unidad2.length != 1)) {
      throw new Error('Error detectado con las unidades');
    }
    let resultado = cantidad * (unidad2[0][1]/unidad1[0][1]);
    return +(resultado.toFixed(4));
  }
}
```

### Ejercicio 3. - DSIflix

- [Acceso al código fuente](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct06-generics-solid-EduardoSY/tree/master/src/ejercicio-3)
- [Acceso a los tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct06-generics-solid-EduardoSY/blob/master/tests/ejercicio-3.spec.ts)


Lo primero que hacemos es crear la interfaz `Stremeable`. Esta interfaz posee dos métodos: un metodo add para añadir elementos (serie, pelicula o documental) y `getElementos` que nos devolvería la lista completa de peliculas, series o documentales.

```typescript
export interface Stremeable<T> {
  addElement(nuevoElemento: T): void;
  getElementos(): T[];
}
```

Para cumplir con la S de los principios SOLID creamos otra interfaz que extiende de `Stremeable`, `StremeableSearch` donde lo que hacemos es definir un método de búsqueda. Así, gracias a esta interfaz, puedo cumplir el principio de responsabilidad única.

```typescript
export interface StremeableSearch<T> extends Stremeable<T> {
  buscar(parametro: string, valor: string): T[];
}
```

Vemos que el método buscar recibe dos argumentos. El primero de ellos es **parametro** que indica la categoría a buscar. El segundo sería el valor a buscar dentro de esa categoría.

La siguiente clase a implementar, siguiendo el guión, es la clase abstracta `BasicStreamableCollection`. Tal cual dice el guión, en este punto podremos particularizar algunos puntos de la interfaz StremeableSearch pero otros será necesarios dejarlos como métodos abstractos para definirlos más adelante en la jerarquía de clases.

En este caso definimos `addElement` donde simplemente hacemos un push a una lista que hemos definido como protected (para que pueda ser vista por las clases heredadas).

Como metodos abstractos tenemos `getElementos` y `buscar`.

```typescript
import {StremeableSearch} from './stremeablesearch';

export abstract class BasicStreamableCollection<T> implements
  StremeableSearch<T> {
  constructor(protected lista: T[]) {};

  addElement(nuevoElemento: T) {
    this.lista.push(nuevoElemento);
  }
  abstract getElementos(): T[];

  abstract buscar(parametro: string, valor: string): T[];
}
```

Finalmente nos queda definir las clases para cada tipo de contenido audiovisual, es decir, una clase `Serie`, una clase `Pelicula` y una clase `Documental`. Estas son muy parecidas entre si asi que con explicar una de ellas será suficiente. 

Explicaremos, por ejemplo, la clase `Pelicula`.

Antes de definir una clase, vamos a definir un tipo de dato que nos permita representar los elementos de esa clase. En este caso, para las películas, he decidico que con un titulo, el año de publicación, el genero y la clasificación es suficiente.

En cuanto a la propia clase, establecemos que para crear el objeto debemos pasarle un array de peliculas.

Ahora nos toca definir los metodos que habiamos declarado como abstractos.

`getElementos` nos devuelve el array completo de peliculas en este caso.

`buscar` nos devuelve un array con todas las coincidencias según la categoría y valor que buscamos. Para rellenar este array lo que hacemos es, con un switch, escoger la categoría a buscar. Una vez tenemos la categoría hacemos uso de filter, una función que devuelve un array en base a una función que le pasemos. La función itera por el array y comprueba si el valor de la categoría del elemento analizado coincide con el que estamos buscando.
```typescript
export type pelicula = {
  titulo: string;
  año: number;
  genero: string;
  clasificacion: number;
}
  constructor(private peliculas: pelicula[]) {
    super(peliculas);
  }

  getElementos() {
    return this.peliculas;
  }

  buscar(parametro: string, valor: string): pelicula[] {
    let resultado: pelicula[] = [];
    switch (parametro) {
      case ('titulo'):
        resultado = this.getElementos().filter((x) => (x.titulo == valor));
        break;
      case ('año'):
        resultado = this.getElementos().filter((x) => (x.año == +valor));
        break;
      case ('genero'):
        resultado = this.getElementos().filter((x) => (x.genero == valor));
        break;
      case ('clasificacion'):
        resultado = this.getElementos().filter((x) =>
          (x.clasificacion == +valor));
        break;
      default:
        console.log('Lo sentimos, no hemos encontrado nada');
    }
    return resultado;
  }
}
```

### Cubrimiento del código

Como todos sabemos, cubrir absolutamente todo el código es algo muy complejo y laborioso. Es por eso que hay ciertas zonas que, si ya las hemos comprobado anteriormente o son cosas triviales, no hacemos pruebas en especifico para ello.

A continuación adjunto una captura donde se muestra el resultado del cubrimiento del código hecho para esta práctica.

## 4. Dificultades y conclusión

A la hora de realizar la práctica ya he notado que los conceptos van avanzando un poco. Ya no me ha resultado tan sencillo como podrían ser las anteriores y he tenido que indagar algo más para entender correctamente los conceptos tratados en esta práctica. Así mismo, he consultado con algunos compañeros durante el desarrollo del código para resolver dudas sobre el planteamiento, sobretodo en el ejercicio 3.

En el desarrollo de esta práctica la verdad que he aprendido bastante, sobretodo porque he tenido que releer los apuntes y consultar en internet, lo que ha hecho que afiance un poco más los conocimientos.

## 5. Referencias
- [Guión práctica 6](https://ull-esit-inf-dsi-2021.github.io/prct06-generics-solid/): Guión de la práctica .
- [Guía para crear un proyecto](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-project-setup.html): Guía del profesor para crear un proyecto.
- [Tutorial de instalación y configuracion Typedoc (Solo alumnos ULL)](https://drive.google.com/file/d/19LLLCuWg7u0TjjKz9q8ZhOXgbrKtPUme/view): Tutorial creado por el profesor sobre cómo instalar, configurar y utilizar Typedoc.
- [Tutorial de instalación y configuración de Mocha y Chai en un proyecto TS (Solo alumnos ULL)](https://drive.google.com/file/d/1-z1oNOZP70WBDyhaaUijjHvFtqd6eAmJ/view): Tutorial creado por el profesor sobre cómo instalar, configurar y utilizar Mocha y Chai.
- [Tutorial Instanbul (Solo alumnos ULL)](https://drive.google.com/file/d/1xLDc4CpoYpsAlCFO_4DMwu7MKCtcZDnh/view): Tutorial creado por el profesor sobre cómo instalar, configurar y utilizar Instanbul y Coveralls.
- [Apuntes sobre objetos, clases e interfaces](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-objects-classes-interfaces.html): Apuntes creados por el profesor sobre objetos, clases e interfaces.
- [Apuntes sobre sobre clases e interfaces genericas](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-generics.html): Apuntes creados por el profesor sobre clases e interfaces genericas.
- [Guia de Typedoc](https://typedoc.org/guides/installation/): Guia oficial de Typedoc
- [Guía de estilo APA](https://biblioguias.uam.es/citar/estilo_apa): Guía sobre los distintos estilos APA
- [Formas de eliminar elementos de un array](https://love2dev.com/blog/javascript-remove-from-array/): Explicación de distintas formas de eliminar un elemento de un array.
- [Cómo ordenar un array](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort): Explicación de cómo funciona la función sort acompañada de ejemplos.