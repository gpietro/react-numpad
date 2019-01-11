import { padding, validate } from '../date';

test('Prova ', () => {
  expect(padding).toBeDefined();
});

test('padding', () => {
  expect(padding('02102012', 'DD.MM.YYYY')).toBe('02102012');
  expect(padding('021020', 'DD.MM.YYYY')).toBe('02102003');
  expect(padding('0210201201', 'DD.MM.YYYY HH:mm')).toBe('021020120102');
  expect(padding('', 'DD.MM.YYYY HH:mm:ss')).toBe('01101903010203');
  expect(padding('1', 'DD.MM.YYYY HH:mm:ss')).toBe('11101903010203');
});

test('validate', () => {
  expect(validate(padding('311', 'DD.MM.YYYY'), 'DD.MM.YYYY', 3)).toBe(true);
  expect(validate(padding('310', 'DD.MM.YYYY'), 'DD.MM.YYYY', 3)).toBe(true);
  expect(validate(padding('311', 'DD.MM.YYYY'), 'DD.MM.YYYY', 3)).toBe(true);
});
