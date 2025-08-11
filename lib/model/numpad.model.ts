import {
  createEvent,
  createStore,
  createEffect,
  sample,
  combine,
} from "effector";

// Types
export interface NumPadState {
  show: boolean;
  value: string;
  initialValue: string;
  preValue: string | number | undefined;
}

// Events
export const toggleKeyPad = createEvent();
export const openKeyPad = createEvent();
export const closeKeyPad = createEvent();
export const updateValue = createEvent<string>();
export const setValue = createEvent<string>();
export const setInitialValue = createEvent<string>();
export const setPreValue = createEvent<string | number | undefined>();
export const handleClickOutside = createEvent<{
  action: "accept" | "cancel";
  displayRule: (value: string) => string;
  onChange: (value: string) => void;
  formatInputValue: (value: string | number) => string;
  valueFromProps: string | number;
}>();

// Effects
export const confirmValueFx = createEffect<
  {
    value: string;
    displayRule: (value: string) => string;
    onChange: (value: string) => void;
  },
  void
>(({ value, displayRule, onChange }) => {
  onChange(displayRule(value));
});

export const syncValueFx = createEffect<
  {
    value: string;
    displayRule: (value: string) => string;
    onChange: (value: string) => void;
  },
  void
>(({ value, displayRule, onChange }) => {
  onChange(displayRule(value));
});

// Stores
export const $show = createStore<boolean>(false)
  .on(toggleKeyPad, (show) => !show)
  .on(openKeyPad, () => true)
  .on(closeKeyPad, () => false)
  .on(confirmValueFx.done, () => false);

export const $value = createStore<string>("")
  .on(updateValue, (_, value) => value)
  .on(setValue, (_, value) => value);

export const $initialValue = createStore<string>("")
  .on(setInitialValue, (_, value) => value)
  .on(closeKeyPad, () => "");

export const $preValue = createStore<string | number | undefined>(undefined, {
  skipVoid: false,
}).on(setPreValue, (_, value) => value);

// Combined state
export const $numPadState = combine({
  show: $show,
  value: $value,
  initialValue: $initialValue,
  preValue: $preValue,
});

// Handle click outside behavior with direct side effects
handleClickOutside.watch(
  ({ action, displayRule, onChange, formatInputValue, valueFromProps }) => {
    const state = $numPadState.getState();

    if (action === "accept") {
      onChange(displayRule(state.value));
    } else {
      setValue(state.initialValue || formatInputValue(valueFromProps));
    }
    closeKeyPad();
  }
);
