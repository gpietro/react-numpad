import { Numpad } from '@/components/numpad';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import '@/styles/index.css';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const Separator = () => (
  <div className="my-2 block h-px w-full bg-gray-200 dark:bg-gray-700" />
);

function App() {
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
      <header className="mb-4">
        <h1 className="font-bold text-2xl">React Numpad Demo</h1>
      </header>

      <main className="flex flex-col gap-4 divide-y">
        <div className="flex">
          <div className="max-w-xs grow p-4">
            <div className="pt-4">
              <h2 className="pb-2">Button with Numpad</h2>
              <Numpad onChange={handleChange('numpad')}>
                <Button>{value.numpad || 'No value'}</Button>
              </Numpad>
            </div>

            <div className="pt-4">
              <h2 className="pb-2">Dialog Numpad</h2>
              <Numpad onChange={handleChange('dialog')}>
                <Button>{value.dialog || 'No value'}</Button>
              </Numpad>
            </div>

            <div className="pt-4">
              <h2 className="pb-2">Inline Numpad</h2>
              <Numpad inline onChange={handleChange('inline')}>
                <Input
                  className="mb-4"
                  name="inline"
                  placeholder="Enter value"
                  type="text"
                  value={value.inline}
                />
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

          <div className="grow bg-slate-50 p-4">
            <strong>Last value:</strong> {String(value.lastValue) ?? 'No value'}
            <Separator />
            {Object.entries(value)
              .filter(([key]) => key !== 'lastValue')
              .map(([key, val]) => (
                <div key={key}>
                  <span className="font-medium">{key}:</span>{' '}
                  {String(val) ?? 'No value'}
                  <Separator />
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}
createRoot(container).render(<App />);
