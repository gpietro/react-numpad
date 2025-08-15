import NumberInput from "./components/Number";
import { InlineNumpad } from "../components/numpad/inline-numpad";

export default {
  Number: NumberInput,
  NumPad: InlineNumpad,
};

// Export Effector model for advanced usage
export * as NumPadModel from "./model/numpad.model";
export * as KeyboardModel from "./model/keyboard.model";
