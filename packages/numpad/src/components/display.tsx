import { Button } from '@repo/ui/components/button';
import { useUnit } from 'effector-react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useLongPress from '@/hooks/useLongPress';
import { $display, backspaceEvent, clearEvent } from '@/models/numpad';

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
        canvasRef.current = document.createElement('canvas');
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
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
      <div className="flex items-center border-border border-b bg-popover p-1 text-popover-foreground">
        <div className="relative flex-grow">
          <input
            className="w-full rounded-none border-0 bg-transparent text-xl outline-none"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={onKeyDown}
            readOnly
            ref={inputRef}
            value={displayValue}
          />

          {/* Blinking cursor */}
          {isFocused && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 h-full w-0.5 bg-foreground"
              style={{
                left: `${Math.max(0, cursorPosition)}px`,
                animation: 'blink 1s infinite',
                zIndex: 1,
              }}
            />
          )}
        </div>
        <Button
          type="button"
          {...backspaceLongPress}
          className="h-8 w-8 p-0 text-muted-foreground"
          onClick={backspace}
          variant="ghost"
        >
          <span>&larr;</span>
        </Button>
      </div>
    );
  }
);

Display.displayName = 'Display';
