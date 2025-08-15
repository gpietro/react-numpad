import { createEvent, createStore, sample } from "effector";

// Minimal KeyboardEvent-like payload to avoid storing DOM events
export interface KeyboardEvt {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
}

// Events
export const setKeyboardInitialValue = createEvent<string>();
export const setKeyboardValidKeys = createEvent<string[]>();
export const keyboardKeyDown = createEvent<KeyboardEvt>();

// Stores
export const $keyboardValue = createStore<string>("").on(
  setKeyboardInitialValue,
  (_, v) => v
);

export const $keyboardValidKeys = createStore<string[]>([]).on(
  setKeyboardValidKeys,
  (_, keys) => keys
);

export const $keyboardLastEvent = createStore<KeyboardEvt | null>(null)
  .on(setKeyboardInitialValue, () => null)
  .on(keyboardKeyDown, (_, e) => e);

// Update value on numeric keydown or backspace. Non-digit keys are handled by higher-level logic.
sample({
  clock: keyboardKeyDown,
  source: { value: $keyboardValue, valid: $keyboardValidKeys },
  fn: ({ value, valid }, evt) => {
    if (evt.key === "Backspace") {
      return value.slice(0, -1);
    }
    if (valid.length > 0) {
      if (valid.includes(evt.key) && /^[0-9]$/.test(evt.key)) {
        return value + evt.key;
      }
    }
    return value;
  },
  target: $keyboardValue,
});
