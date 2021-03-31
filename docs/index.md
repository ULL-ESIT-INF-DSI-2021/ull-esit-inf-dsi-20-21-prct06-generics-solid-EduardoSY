# Práctica 6 - Clases e interfaces genéricas. Principios SOLID
* Elaborado por Eduardo Da Silva Yanes

## 1. Introducción
En esta sexta práctica vamos a profundizar en el uso de clases abtractas y genéricas así como interfaces. Durante todo el desarrollo de este ejercicio vamos a procurar aplicar los principios S y O de SOLID. En caso de que querramos saber más sobre estos principios podemos visitar esta página sobre [los principios SOLID de Typescript](https://samueleresca.net/solid-principles-using-typescript/). 

Además de lo previamente mencionado vamos a trabajar con Instanbul (y de manera opcional con Coveralls). Gracias a Instanbul podremos tener una métrica de cuánto código hemos cubierto con nuestras pruebas mediant el desarrollo TDD. Para conocer más sobre Instanbul podemos revisar [la página oficial de Instanbul](https://istanbul.js.org/).

Coveralls es opcional debido a que, para una cuenta estandar, no es posible trackear un repositorio privado. Es por esto que, para poder utilizar la herramienta debemos hacer público nuestro repositorio. Si quieremos probar esta herramienta (cosa recomendable) lo haremos una vez haya pasado la fecha de entrega.

## 2. Pasos previos
Antes de comenzar con el desarrollo de código fuente vamos a generar nuestra estructura de trabajo. En este caso será algo diferente. En lugar de tener simplemente un directorio **/src** donde almacenamos los diferentes ejercicios, vamos a hacer un directorio por cada ejercicio. Siempre que trabajemos con clases se recomienda crear un directorio independiente para cada ejercicio y, dentro de ese directorio, un fichero independiente para cada clase.
El resto será completamente igual.