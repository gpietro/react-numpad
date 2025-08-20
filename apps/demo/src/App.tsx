import { Numpad } from '@oggi/numpad';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Separator } from '@repo/ui/components/separator';
import { useState } from 'react';

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
      className="m-auto max-w-2xl rounded border p-4"
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
          <div className="flex max-w-xs flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Numpad with Button</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <Numpad onChange={handleChange('numpad')}>
                  <Button variant="secondary">
                    {value.numpad || 'No value'}
                  </Button>
                </Numpad>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialog Numpad</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <Numpad onChange={handleChange('dialog')}>
                  <Button variant="default">
                    {value.dialog || 'No value'}
                  </Button>
                </Numpad>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inline Numpad</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <Numpad inline onChange={handleChange('inline')}>
                  <div className="mb-4">
                    Inline value: {value.inline ?? 'No value'}
                  </div>
                </Numpad>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popover Numpad</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <Numpad onChange={handleChange('popover')}>
                  <Input
                    placeholder="Open values"
                    type="text"
                    value={value.popover}
                  />
                </Numpad>
              </CardContent>
            </Card>
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
