import { createEvent, createStore, sample } from 'effector';

export const pressKeyEvent = createEvent<string>();
export const backspaceEvent = createEvent<void>();
export const clearEvent = createEvent<void>();
export const updateInitialValueEvent = createEvent<void>();
export const cancelEvent = createEvent<void>();

export const $display = createStore<string>('');
export const $value = createStore<string>('');
export const $initialValue = createStore<string>('');

$display.on(backspaceEvent, (state) => state.slice(0, -1)).reset(clearEvent);

sample({
  clock: updateInitialValueEvent,
  source: $display,
  target: $initialValue,
});

sample({
  clock: cancelEvent,
  source: $initialValue,
  target: $display,
});

sample({
  clock: pressKeyEvent,
  source: $display,
  filter: (_, key) => Number.isNaN(Number(key)) === false,
  fn: (source, key) => source + key,
  target: $display,
});

sample({
  clock: pressKeyEvent,
  source: $display,
  filter: (_, clock) => clock === '-',
  fn: (source, key) =>
    source.includes('-') ? source.replace('-', '') : key + source,
  target: $display,
});

sample({
  clock: pressKeyEvent,
  source: $display,
  filter: (source, clock) => clock === '.' && source.includes('.') === false,
  fn: (source, key) => source + key,
  target: $display,
});
