import 'mocha';
import {expect} from 'chai';
import {isConvertible} from '../src/ejercicio-2/isconvertible';
import {Fuerza} from '../src/ejercicio-2/fuerza';
import {Volumen} from '../src/ejercicio-2/volumen';
import {Masa} from '../src/ejercicio-2/masa';
import {Temperatura} from '../src/ejercicio-2/temperatura';
import {Longitud} from '../src/ejercicio-2/longitud';
import {Velocidad} from '../src/ejercicio-2/velocidad';
import {Tiempo} from '../src/ejercicio-2/tiempo';

describe('Comprobamos las conversiones', () => {
  let min2day = new Tiempo('minuto', 'dia');
  let ms2kmh = new Velocidad('m/s', 'km/h');
  let m2mi = new Longitud('metros', 'millas');
  let c2k = new Temperatura('celcius', 'kelvin');
  let g2li = new Masa('gramos', 'libra');
  let l2m3 = new Volumen('litro', 'metro cubico');
  let n2kp = new Fuerza('newton', 'kilopondio');

  it('1500 min son 1.0417 dias', () => {
    expect(min2day.convertir(1500)).to.be.equal(1.0417);
  });

  it('100 m/s son 360 km/h', () => {
    expect(ms2kmh.convertir(100)).to.be.equal(360);
  });

  it('1 grado celcius metros son 274.15 K', () => {
    expect(c2k.convertir(1)).to.be.equal(274.15);
  });

  it('1000 metros son 0.62 millas', () => {
    expect(m2mi.convertir(1000)).to.be.equal(0.6214);
  });

  it('500 gramos son 1.1023 libras', () => {
    expect(g2li.convertir(500)).to.be.equal(1.1023);
  });

  it('500 litros son 0.5 m3', () => {
    expect(l2m3.convertir(500)).to.be.equal(0.5);
  });

  it('100 newton son 10.1972 kilopondios', () => {
    expect(n2kp.convertir(100)).to.be.equal(10.1972);
  });
});