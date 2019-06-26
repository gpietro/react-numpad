import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import NumPad from '../index';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('number', () => {
  const { getByText, getByRole, container } = render(<NumPad.Number inline />);

  fireEvent.click(getByText('1'));
  const display = getByRole('display');
  expect(display.value).toBe('1');

  fireEvent.keyDown(container, { key: '3' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('-13');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('-132');

  fireEvent.keyDown(container, { key: '.' });
  expect(display.value).toBe('-132.');

  fireEvent.keyDown(container, { key: '.' });
  expect(display.value).toBe('-132.');

  fireEvent.keyDown(container, { key: '0' });
  expect(display.value).toBe('-132.0');
});

test('oddValidator', () => {
  const oddValidator = value => parseInt(value, 10) % 2 !== 0 && parseFloat(value) % 1 === 0;

  const { getByText, getByRole, container } = render(
    <NumPad.Number keyValidator={oddValidator} inline />
  );

  fireEvent.click(getByText('1'));
  const display = getByRole('display');
  expect(display.value).toBe('1');

  fireEvent.keyDown(container, { key: '3' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('-13');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '5' });
  expect(display.value).toBe('135');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('-135');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('135');

  fireEvent.keyDown(container, { key: 'Backspace' });
  expect(display.value).toBe('13');
});

test('positive number', () => {
  const { getByText, getByRole, container } = render(<NumPad.Number inline negative={false} />);

  fireEvent.click(getByText('1'));
  const display = getByRole('display');
  expect(display.value).toBe('1');

  fireEvent.keyDown(container, { key: '3' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('132');

  fireEvent.keyDown(container, { key: '.' });
  expect(display.value).toBe('132.');

  fireEvent.keyDown(container, { key: '.' });
  expect(display.value).toBe('132.');

  fireEvent.keyDown(container, { key: '0' });
  expect(display.value).toBe('132.0');
});

test('positive integer', () => {
  const { getByText, getByRole, container } = render(
    <NumPad.Number inline negative={false} decimal={false} />
  );

  fireEvent.click(getByText('1'));
  const display = getByRole('display');
  expect(display.value).toBe('1');

  fireEvent.keyDown(container, { key: '3' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('13');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('132');

  fireEvent.keyDown(container, { key: '.' });
  expect(display.value).toBe('132');

  fireEvent.keyDown(container, { key: '.' });
  expect(display.value).toBe('132');

  fireEvent.keyDown(container, { key: '0' });
  expect(display.value).toBe('1320');
});

test('time', () => {
  const { getByText, getByRole, container } = render(<NumPad.DateTime dateFormat="HH:mm" inline />);

  const display = getByRole('display');

  fireEvent.click(getByText('6'));
  expect(display.value).toBe('__:__');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('1_:__');

  fireEvent.keyDown(container, { key: '3' });
  expect(display.value).toBe('13:__');

  fireEvent.keyDown(container, { key: '-' });
  expect(display.value).toBe('13:__');

  fireEvent.keyDown(container, { key: '9' });
  expect(display.value).toBe('13:__');

  fireEvent.keyDown(container, { key: '2' });
  expect(display.value).toBe('13:2_');

  fireEvent.keyDown(container, { key: 'Backspace' });
  expect(display.value).toBe('13:__');

  fireEvent.keyDown(container, { key: '1' });
  expect(display.value).toBe('13:1_');

  fireEvent.keyDown(container, { key: '0' });
  expect(display.value).toBe('13:10');

  fireEvent.keyDown(container, { key: '0' });
  expect(display.value).toBe('13:10');

  fireEvent.keyDown(container, { key: 'Backspace' });
  expect(display.value).toBe('13:1_');
});

test('date time CH format', () => {
  const { getByText, getByRole, container } = render(
    <NumPad.DateTime dateFormat="DD.MM.YYYY HH:mm" inline />
  );

  const display = getByRole('display');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('1_.__.____ __:__');

  fireEvent.click(getByText('4'));
  expect(display.value).toBe('14.__.____ __:__');

  fireEvent.click(getByText('4'));
  expect(display.value).toBe('14.__.____ __:__');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('14.1_.____ __:__');

  fireEvent.click(getByText('3'));
  expect(display.value).toBe('14.1_.____ __:__');

  fireEvent.click(getByText('2'));
  expect(display.value).toBe('14.12.____ __:__');

  fireEvent.click(getByText('2'));
  expect(display.value).toBe('14.12.2___ __:__');

  fireEvent.click(getByText('2'));
  expect(display.value).toBe('14.12.22__ __:__');

  fireEvent.click(getByText('2'));
  expect(display.value).toBe('14.12.222_ __:__');

  fireEvent.click(getByText('2'));
  expect(display.value).toBe('14.12.2222 __:__');

  fireEvent.click(getByText('6'));
  expect(display.value).toBe('14.12.2222 __:__');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('14.12.2222 1_:__');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('14.12.2222 11:__');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('14.12.2222 11:1_');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('14.12.2222 11:11');

  fireEvent.click(getByText('1'));
  expect(display.value).toBe('14.12.2222 11:11');

  fireEvent.keyDown(container, { key: 'Backspace' });
  fireEvent.keyDown(container, { key: 'Backspace' });
  fireEvent.keyDown(container, { key: 'Backspace' });

  expect(display.value).toBe('14.12.2222 1_:__');
});
