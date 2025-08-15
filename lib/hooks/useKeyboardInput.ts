import { useEffect, useMemo } from "react";
import { useUnit } from "effector-react";
import {
  $keyboardLastEvent,
  $keyboardValue,
  keyboardKeyDown,
  setKeyboardInitialValue,
  setKeyboardValidKeys,
} from "../model/keyboard.model";

export default function useKeyboardInput(
  initialValue: string,
  validKeys: string[] = []
) {
  const [value, keyDownEvent, emitKey, setInit, setValid] = useUnit([
    $keyboardValue,
    $keyboardLastEvent,
    keyboardKeyDown,
    setKeyboardInitialValue,
    setKeyboardValidKeys,
  ]);

  // Sync initial value and valid keys with the Effector model
  useEffect(() => {
    setInit(initialValue);
  }, [initialValue, setInit]);

  useEffect(() => {
    setValid(validKeys);
  }, [validKeys, setValid]);

  // Wire document keydown to effector event
  useEffect(() => {
    const handler = (event: KeyboardEvent) =>
      emitKey({ key: event.key, ctrlKey: event.ctrlKey, altKey: event.altKey });
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [emitKey]);

  const virtualInteraction = useMemo(
    () => (key: string) => emitKey({ key }),
    [emitKey]
  );

  return { value, keyDownEvent, virtualInteraction };
}
