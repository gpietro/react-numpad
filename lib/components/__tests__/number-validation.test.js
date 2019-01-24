import { numberValidatior, positiveValidation, integerValidation } from '../Number';

test('Positive Validation', () => {
  expect(positiveValidation('1')).toBe(true);
  expect(positiveValidation('1.2')).toBe(true);
  expect(positiveValidation('0.2')).toBe(true);
  expect(positiveValidation('0')).toBe(true);
  expect(positiveValidation('-0.2')).toBe(false);
  expect(positiveValidation('-2')).toBe(false);
});

test('Integer Validation', () => {
  expect(integerValidation('1')).toBe(true);
  expect(integerValidation('0.1')).toBe(false);
  expect(integerValidation('0')).toBe(true);
  expect(integerValidation('0.0')).toBe(true);
  expect(integerValidation('-0.1')).toBe(false);
  expect(integerValidation('-1')).toBe(true);
});

test('Number validator factory (decimal=false, negative=false)', () => {
  expect(numberValidatior(false, false)('2.2')).toBe(false);
  expect(numberValidatior(false, false)('2')).toBe(true);
  expect(numberValidatior(false, false)('0')).toBe(true);
  expect(numberValidatior(false, false)('-2')).toBe(false);
  expect(numberValidatior(false, false)('-2.2')).toBe(false);
});

test('Number validator factory (decimal=true, negative=false)', () => {
  expect(numberValidatior(true, false)('2.2')).toBe(true);
  expect(numberValidatior(true, false)('2')).toBe(true);
  expect(numberValidatior(true, false)('0')).toBe(true);
  expect(numberValidatior(true, false)('-2')).toBe(false);
  expect(numberValidatior(true, false)('-2.2')).toBe(false);
});

test('Number validator factory (decimal=false, negative=true)', () => {
  expect(numberValidatior(false, true)('2.2')).toBe(false);
  expect(numberValidatior(false, true)('2')).toBe(true);
  expect(numberValidatior(false, true)('0')).toBe(true);
  expect(numberValidatior(false, true)('-2')).toBe(true);
  expect(numberValidatior(false, true)('-2.2')).toBe(false);
});

test('Number validator factory (decimal=true, negative=true)', () => {
  expect(numberValidatior(true, true)('2.2')).toBe(true);
  expect(numberValidatior(true, true)('2')).toBe(true);
  expect(numberValidatior(true, true)('0')).toBe(true);
  expect(numberValidatior(true, true)('-2')).toBe(true);
  expect(numberValidatior(true, true)('-2.2')).toBe(true);
});

test('Bugfix: Number.isNaN("3.3....3") === false', () => {
  expect(numberValidatior()('2.2.8')).toBe(false);
});

test('Decimal precision', () => {
  expect(numberValidatior(1)('2.2')).toBe(true);
  expect(numberValidatior(1)('2.21')).toBe(false);
  expect(numberValidatior(10)('2.1234567890')).toBe(true);
  expect(numberValidatior(10)('2.1234567890133443')).toBe(false);
  expect(numberValidatior(10)('1234567.12345')).toBe(true);
  expect(numberValidatior(1)('1234567')).toBe(true);
});
