import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../lib/index.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Numpad } from "@/components/numpad";

function App() {
  const [value, setValue] = useState<string | number>("");

  return (
    <div
      className="max-w-xs border m-auto my-10"
      style={{
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        padding: 24,
      }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>React Numpad Demo</h1>

      <div className="mt-6">
        <Numpad onChange={setValue}>
          <Button>{value || "No value"}</Button>
        </Numpad>
      </div>

      <div className="mt-6">
        <h1>Dialog Numpad</h1>
        <Numpad onChange={setValue} />
      </div>

      <div className="mt-6">
        <h1>Inline</h1>
        <Numpad onChange={setValue}>
          <Input type="text" placeholder="Enter value" />
        </Numpad>
      </div>

      <div className="mt-6">
        <h1>Popover Numpad</h1>
        <Numpad onChange={setValue}>
          <Input type="text" placeholder="Open values" />
        </Numpad>
      </div>

      <div className="mt-6">
        <strong>Last value:</strong> {String(value)}
      </div>
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");
createRoot(container).render(<App />);
