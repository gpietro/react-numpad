import { Numpad } from '@oggi/numpad';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { useState } from 'react';

const Separator = () => <div className="bg- my-2 block h-px w-full" />;

export function App() {
  const toggleTheme = () => {
    const root = window.document.documentElement;

    root.classList.toggle('dark');
    root.classList.toggle('light');
  };

  const [value, setValue] = useState<{
    [key: string]: string;
    lastValue: string;
  }>({
    lastValue: '',
  });

  const handleChange = (key: string) => (newValue: string) => {
    setValue((prev) => ({ ...prev, [key]: newValue, lastValue: newValue }));
  };

  return (
    <div
      className="m-auto mt-4 max-w-2xl rounded border p-4"
      style={{
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <header className="mb-4 flex justify-between">
        <h1 className="font-bold text-2xl">React Numpad Demo </h1>
        <Button onClick={toggleTheme} variant="outline">
          Toggle theme
        </Button>
      </header>

      <main className="flex flex-col gap-4 divide-y">
        <div className="flex">
          <div className="max-w-xs grow p-4">
            <div className="pt-4">
              <h2 className="pb-2">Button with Numpad</h2>
              <Numpad onChange={handleChange('numpad')}>
                <Button variant="secondary">
                  {value.numpad || 'No value'}
                </Button>
              </Numpad>
            </div>

            <div className="pt-4">
              <h2 className="pb-2">Dialog Numpad</h2>
              <Numpad onChange={handleChange('dialog')}>
                <Button variant="default">{value.dialog || 'No value'}</Button>
              </Numpad>
            </div>

            <div className="pt-4">
              <h2 className="pb-2">Inline Numpad</h2>
              <Numpad inline onChange={handleChange('inline')}>
                <div className="mb-4">
                  Inline value: {value.inline ?? 'No value'}
                </div>
              </Numpad>
            </div>

            <div className="pt-4">
              <h2 className="pb-2">Popover Numpad</h2>
              <Numpad onChange={handleChange('popover')}>
                <Input
                  placeholder="Open values"
                  type="text"
                  value={value.popover}
                />
              </Numpad>
            </div>
          </div>

          <div className="grow p-4">
            <strong>Last value:</strong> {value.lastValue ?? 'No value'}
            <Separator />
            {Object.entries(value)
              .filter(([key]) => key !== 'lastValue')
              .map(([key, val]) => (
                <div key={key}>
                  <span className="font-medium">{key}:</span>{' '}
                  {val ?? 'No value'}
                  <Separator />
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
