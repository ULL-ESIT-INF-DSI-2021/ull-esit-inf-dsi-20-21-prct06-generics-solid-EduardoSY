import 'mocha';
import {expect} from 'chai';
import {Lifo} from '../src/ejercicio-pe103';


describe('Compromos ejercicio PE103', () => {
  it('Se puede instanciar una clase Lifo', () => {
    expect(new Lifo<number>([3, 4])).to.exist;
  });
  it('Se puede instanciar una clase Lifo con booleanos', () => {
    expect(new Lifo<boolean>([true, false, false])).to.exist;
  });
  it('Se puede instanciar una clase Lifo con strings', () => {
    expect(new Lifo<string>(['Hola', 'soy', 'un string'])).to.exist;
  });
  const Lifo2 = new Lifo<number>([1, 2, 3, 4]);
  it('Se comprueba el correcto funcionamiento del getter', () => {
    expect(Lifo2.getArrayLifo()).to.eql([1, 2, 3, 4]);
  });
  it('Se comprueba que push funciona correctamente.', () => {
    Lifo2.push(5);
    expect(Lifo2.getArrayLifo()).to.eql([1, 2, 3, 4, 5]);
  });
  it('Se comprueba que pop funciona correctamente.', () => {
    Lifo2.pop();
    expect(Lifo2.getArrayLifo()).not.eql([1, 2, 3, 4, 5]);
    expect(Lifo2.getArrayLifo()).to.eql([1, 2, 3, 4]);
  });
  it('Se comprueba que pseek funciona correctamente. Returns 4', () => {
    expect(Lifo2.pseek()).to.be.equal(4);
  });
  it('Hacemos pop y pseek deberia retornar el valor 3', () => {
    Lifo2.pop();
    expect(Lifo2.pseek()).to.be.equal(3);
  });
  it('Se comprueba que size() funciona correctamente. Returns 3', () => {
    expect(Lifo2.size()).to.be.equal(3);
  });
});