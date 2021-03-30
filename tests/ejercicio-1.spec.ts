import 'mocha';
import {expect} from 'chai';
import {Combat} from '../src/ejercicio-1/combat';
import {Marvel} from '../src/ejercicio-1/marvel';
import {Pokemon} from '../src/ejercicio-1/pokemon';
import {DragonBall} from '../src/ejercicio-1/dragonball';
import {StarWars} from '../src/ejercicio-1/starwars';
import {Fighter} from '../src/ejercicio-1/fighter';
import {Fighterdex} from '../src/ejercicio-1/fighterdex';

describe('Comprobamos la clase Pokemon (El resto son casi identicas)', () => {
  let poke1 = new Pokemon('Pikachu', 'Electrico', 15, 5, 'Pika Pi',
      {hpMax: 35, attack: 55, def: 40, speed: 90});

  it('Poke1 es una instancia de pokemon', () => {
    expect(poke1).to.be.instanceOf(Pokemon);
  });

  it('Poke1 es una instancia luchador', () => {
    expect(poke1).to.be.instanceOf(Fighter);
  });

  it('Poke1 pertenece al universo de Pokemon', () => {
    expect(poke1.getUniverso()).to.be.equal('Pokemon');
  });

  it('Poke1 es tipo electrico', () => {
    expect(poke1.getTipo()).to.be.equal('Electrico');
  });

  it('Poke1 posee 55 puntos de ataque', () => {
    expect(poke1.getStats().attack).to.be.equal(55);
  });
});

describe('Comprobamos la clase Combate', () => {
  let pikachu = new Pokemon('Pikachu', 'Electrico', 15, 50, 'Pika Pi',
      {hpMax: 35, attack: 55, def: 40, speed: 90});
  let magikarp = new Pokemon('Magikarp', 'Agua', 3, 25, 'Splash, splash',
      {hpMax: 20, attack: 5, def: 30, speed: 10});
  let sceptile = new Pokemon('Sceptile', 'Hierba', 52, 170,
      '**Sonido de hojas**', {hpMax: 70, attack: 85, def: 65, speed: 120});
  let vegetta = new DragonBall('Vegeta', 80, 190,
      'Heey muy buenas a todos guapisimos',
      {hpMax: 500, attack: 600, def: 500, speed: 250});
  let hulk = new Marvel('Hulk', 290, 315,
      'Hulk APLASTA',
      {hpMax: 400, attack: 300, def: 450, speed: 150});
  let yoda = new StarWars('Yoda', 30, 100,
      'Mucho que aprender todavia tienes',
      {hpMax: 100, attack: 50, def: 100, speed: 50});

  let combate1 = new Combat(yoda, hulk);
  let combate2 = new Combat(pikachu, vegetta);
  let combate3 = new Combat(sceptile, magikarp);

  it('Combate1 es un combate', () => {
    expect(combate1).to.be.instanceOf(Combat);
  });

  it('Combate1 es ganado por Hulk', () => {
    expect(combate1.combatir()).to.be.equal('Hulk gana!');
  });

  it('Combate2 es ganado por Vegeta', () => {
    expect(combate2.combatir()).to.be.equal('Vegeta gana!');
  });

  it('Combate3 es ganado por Sceptile', () => {
    expect(combate3.combatir()).to.be.equal('Sceptile gana!');
  });
});

describe('Comprobamos la clase Combate', () => {
  let pikachu = new Pokemon('Pikachu', 'Electrico', 15, 50, 'Pika Pi',
      {hpMax: 35, attack: 55, def: 40, speed: 90});
  let vegetta = new DragonBall('Vegeta', 80, 190,
      'Heey muy buenas a todos guapisimos',
      {hpMax: 500, attack: 600, def: 500, speed: 250});
  let hulk = new Marvel('Hulk', 290, 315,
      'Hulk APLASTA',
      {hpMax: 400, attack: 300, def: 450, speed: 150});
  let yoda = new StarWars('Yoda', 30, 100,
      'Mucho que aprender todavia tienes',
      {hpMax: 100, attack: 50, def: 100, speed: 50});

  let fightdex = new Fighterdex([]);

  it('Fightdex es una instancia de Fighterdex', () => {
    expect(fightdex).to.be.instanceOf(Fighterdex);
  });

  it('Fightdex esta vacia', () => {
    expect(fightdex.fighterdexSize()).to.be.equal(0);
  });

  it('Fightdex ahora tiene 3 luchadores', () => {
    fightdex.addFighter(yoda);
    fightdex.addFighter(hulk);
    fightdex.addFighter(vegetta);
    expect(fightdex.fighterdexSize()).to.be.equal(3);
  });

  it('Fightdex tiene a vegetta777', () => {
    expect(fightdex.buscarLuchador(vegetta)).not.to.null;
  });

  it('Fightdex no tiene a pikachu', () => {
    expect(fightdex.buscarLuchador(pikachu)).to.be.equal(null);
  });

  it('Se ha eliminado a yoda. Ahora solo hay 2 luchadores', () => {
    fightdex.delFighter(yoda);
    expect(fightdex.fighterdexSize()).to.be.equal(2);
  });
});