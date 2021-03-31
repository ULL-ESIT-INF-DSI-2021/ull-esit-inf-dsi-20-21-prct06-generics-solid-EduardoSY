import 'mocha';
import {expect} from 'chai';
import {Documentales} from '../src/ejercicio-3/documental';
import {Peliculas} from '../src/ejercicio-3/pelicula';
import {Series} from '../src/ejercicio-3/serie';

describe('Comprobamos las clases del ejercicio 3', () => {
  let serie1 = {titulo: 'Modern Family', año: 2009, temporadas: 11,
    genero: 'sitcom', clasificacion: 7.5};
  let listaSeries = new Series([
    {titulo: 'The Big Bang Theory', año: 2007, temporadas: 12,
      genero: 'sitcom', clasificacion: 8}, serie1]);
  let listaDocumental = new Documentales([
    {titulo: 'El Gran Hackeo', año: 2019, genero: 'tecnologia',
      duracion: 113}]);
  let listaPeliculas = new Peliculas([
    {titulo: 'The fate of the Furious', año: 2017, genero: 'accion',
      clasificacion: 8.3}]);
  let peliculanueva = {titulo: 'El Padrino',
    año: 1975, genero: 'drama', clasificacion: 9.3};

  it('Se puede añadir una pelicula nueva', () => {
    listaPeliculas.addElement(peliculanueva);
    expect(listaPeliculas.getElementos().length).to.be.equal(2);
  });

  it('Se puede buscar la nueva pelicula añadida por nombre', () => {
    expect(listaPeliculas.buscar('titulo', 'El Padrino')).to.deep.
        equal([peliculanueva]);
  });

  it('Se puede buscar una pelicula por año', () => {
    expect(listaPeliculas.buscar('año', '2017')).to.deep.
        equal([{titulo: 'The fate of the Furious', año: 2017, genero: 'accion',
          clasificacion: 8.3}]);
  });

  it('Se puede buscar una pelicula por clasificacion', () => {
    expect(listaPeliculas.buscar('clasificacion', '8.3')).to.deep.
        equal([{titulo: 'The fate of the Furious', año: 2017, genero: 'accion',
          clasificacion: 8.3}]);
  });

  it('Se puede buscar una pelicula por genero', () => {
    expect(listaPeliculas.buscar('genero', 'accion')).to.deep.
        equal([{titulo: 'The fate of the Furious', año: 2017, genero: 'accion',
          clasificacion: 8.3}]);
  });

  it('Si no se encuentra nada se devuelve vacio', () => {
    expect(listaPeliculas.buscar('dinero', 'accion')).to.deep.
        equal([]);
  });

  it('Se puede buscar una serie por nombre', () => {
    expect(listaSeries.buscar('titulo', 'Modern Family')).to.deep.
        equal([serie1]);
  });

  it('Se puede buscar una serie por nombre', () => {
    expect(listaSeries.buscar('titulo', 'Modern Family')).to.deep.
        equal([serie1]);
  });

  it('Se puede buscar una serie por genero', () => {
    expect(listaSeries.buscar('genero', 'sitcom').length).to.be.
        equal(2);
  });

  it('Se puede buscar una serie por año', () => {
    expect(listaSeries.buscar('año', '2009')).to.deep.
        equal([serie1]);
  });

  it('Se puede buscar una serie por numero de temporadas', () => {
    expect(listaSeries.buscar('temporadas', '11')).to.deep.
        equal([serie1]);
  });

  it('Se puede buscar una serie por clasificacion', () => {
    expect(listaSeries.buscar('clasificacion', '7.5')).to.deep.
        equal([serie1]);
  });

  it('Se puede buscar un documental por duracion', () => {
    expect(listaDocumental.buscar('duracion', '113')).to.deep.
        equal([{titulo: 'El Gran Hackeo', año: 2019, genero: 'tecnologia',
          duracion: 113}]);
  });

  it('Se puede buscar un documental por fecha', () => {
    expect(listaDocumental.buscar('año', '2019')).to.deep.
        equal([{titulo: 'El Gran Hackeo', año: 2019, genero: 'tecnologia',
          duracion: 113}]);
  });

  it('Se puede buscar un documental por genero', () => {
    expect(listaDocumental.buscar('genero', 'tecnologia')).to.deep.
        equal([{titulo: 'El Gran Hackeo', año: 2019, genero: 'tecnologia',
          duracion: 113}]);
  });

  it('Se puede buscar un documental por nombre', () => {
    expect(listaDocumental.buscar('titulo', 'El Gran Hackeo')).to.deep.
        equal([{titulo: 'El Gran Hackeo', año: 2019, genero: 'tecnologia',
          duracion: 113}]);
  });
});