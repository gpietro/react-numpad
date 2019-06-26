import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import NumPad from '../index';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('oddValidator', () => {
  const oddValidator = value => parseInt(value, 10) % 2 !== 0 && parseFloat(value) % 1 === 0;

  const { getByText, getByRole, container } = render(
    <NumPad.Number
      keyValidator={oddValidator}
      onChange={() => console.log('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
      inline
    />
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
  const { getByText, getByRole, container } = render(
    <NumPad.Number
      onChange={() => console.log('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
      inline
      negative={false}
    />
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
});

test('time', () => {
  const { getByText, getByRole, container } = render(
    <NumPad.DateTime dateFormat="HH:mm" onChange={() => console.log('onChange')} inline />
  );

  fireEvent.click(getByText('1'));
  const display = getByRole('display');
  expect(display.value).toBe('1_:__');

  fireEvent.keyDown(container, { key: '3' });
  expect(display.value).toBe('13:__');

  fireEvent.keyDown(container, { key: '-' });
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
