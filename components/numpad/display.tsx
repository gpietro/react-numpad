import {
  type FC,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import useLongPress from "../../lib/hooks/useLongPress";
import { Button } from "@/components/ui/button";
import { useUnit } from "effector-react";
import {
  $display,
  backspaceEvent,
  clearEvent,
  pressKeyEvent,
  updateInitialValueEvent,
} from "../../models/numpad";
import { is } from "effector";

export interface DisplayRef {
  focus: () => void;
  blur: () => void;
}

interface DisplayProps {
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Display = forwardRef<DisplayRef, DisplayProps>(
  ({ onKeyDown }, ref) => {
    const displayValue = useUnit($display);
    const [backspace, clear] = useUnit([backspaceEvent, clearEvent]);
    const backspaceLongPress = useLongPress(clear, 300);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
        setIsFocused(true);
      },
      blur: () => {
        inputRef.current?.blur();
        setIsFocused(false);
      },
    }));

    // More accurate text measurement using Canvas API
    const measureTextWidth = useCallback((text: string): number => {
      if (!inputRef.current) return 0;

      if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas");
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return 0;

      const computedStyle = window.getComputedStyle(inputRef.current);
      context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;

      return context.measureText(text).width;
    }, []);

    // Update cursor position when display value changes
    useEffect(() => {
      if (inputRef.current) {
        const width = measureTextWidth(displayValue);
        setCursorPosition(width);
      }
    }, [displayValue, measureTextWidth]);

    const handleFocus = () => {
      setIsFocused(true);
      // Update cursor position on focus
      if (inputRef.current) {
        const width = measureTextWidth(displayValue);
        setCursorPosition(width);
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <div className="flex items-center p-1 bg-popover text-popover-foreground border-b border-border">
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            value={displayValue}
            readOnly
            onKeyDown={onKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full bg-transparent text-xl outline-none border-0 rounded-none"
          />

          {/* Blinking cursor */}
          {isFocused && (
            <div
              className="absolute top-0 h-full w-0.5 bg-foreground pointer-events-none"
              style={{
                left: `${Math.max(0, cursorPosition)}px`,
                animation: "blink 1s infinite",
                zIndex: 1,
              }}
              aria-hidden="true"
            />
          )}
        </div>
        <Button
          type="button"
          {...backspaceLongPress}
          onClick={backspace}
          variant="ghost"
          className="text-muted-foreground h-8 w-8 p-0">
          <span>&larr;</span>
        </Button>
      </div>
    );
  }
);

Display.displayName = "Display";
