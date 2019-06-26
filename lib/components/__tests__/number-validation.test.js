import { numberValidator, positiveValidation, integerValidation } from '../Number';

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

test('Number validator factory (decimal=false, sign=false)', () => {
  expect(numberValidator(false, false)('2.2')).toBe(false);
  expect(numberValidator(false, false)('2')).toBe(true);
  expect(numberValidator(false, false)('0')).toBe(true);
  expect(numberValidator(false, false)('-2')).toBe(false);
  expect(numberValidator(false, false)('-2.2')).toBe(false);
});

test('Number validator factory (decimal=true, sign=false)', () => {
  expect(numberValidator(true, false)('2.2')).toBe(true);
  expect(numberValidator(true, false)('2')).toBe(true);
  expect(numberValidator(true, false)('0')).toBe(true);
  expect(numberValidator(true, false)('-2')).toBe(false);
  expect(numberValidator(true, false)('-2.2')).toBe(false);
});

test('Number validator factory (decimal=false, sign=true)', () => {
  expect(numberValidator(false, true)('2.2')).toBe(false);
  expect(numberValidator(false, true)('2')).toBe(true);
  expect(numberValidator(false, true)('0')).toBe(true);
  expect(numberValidator(false, true)('-2')).toBe(true);
  expect(numberValidator(false, true)('-2.2')).toBe(false);
});

test('Number validator factory (decimal=true, sign=true)', () => {
  expect(numberValidator(true, true)('2.2')).toBe(true);
  expect(numberValidator(true, true)('2')).toBe(true);
  expect(numberValidator(true, true)('0')).toBe(true);
  expect(numberValidator(true, true)('-2')).toBe(true);
  expect(numberValidator(true, true)('-2.2')).toBe(true);
});

test('Bugfix: Number.isNaN("3.3....3") === false', () => {
  expect(numberValidator()('2.2.8')).toBe(false);
});

test('Decimal precision', () => {
  expect(numberValidator(1)('2.2')).toBe(true);
  expect(numberValidator(1)('2.21')).toBe(false);
  expect(numberValidator(10)('2.1234567890')).toBe(true);
  expect(numberValidator(10)('2.1234567890133443')).toBe(false);
  expect(numberValidator(10)('1234567.12345')).toBe(true);
  expect(numberValidator(1)('1234567')).toBe(true);
});
