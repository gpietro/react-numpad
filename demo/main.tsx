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
      <Input type="email" placeholder="Email" />
      <br />
      <Button>Button</Button>

      <div style={{ marginTop: 24 }}>
        <h1>Dialog Numpad</h1>
        <Numpad onChange={setValue} />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Inline</h1>
        <Numpad onChange={setValue}>
          <Input type="text" placeholder="Enter value" />
        </Numpad>
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Popover Numpad</h1>
        <Numpad onChange={setValue}>
          <Input type="text" placeholder="Open values" />
        </Numpad>
      </div>

      {/* <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div>
          <NumPad.Number
            onChange={setValue}
            label="Basic (Cancel on outside click)"
            position="center"
            value={value}
            onClickOutside="cancel"
          />
        </div>
        <div>
          <div>Accept on outside click</div>
          <NumPad.Number
            onChange={setValue}
            label="Accept on outside click"
            value={value}
            negative={false}
            decimal={false}
            onClickOutside="accept"
          />
        </div>
        <div>
          <div>Accept number between 12 and 45</div>
          <NumPad.Number
            onChange={setValue}
            inline
            label="Inline"
            value={value}
            negative={false}
            decimal={false}
            keyValidator={(value) => Number(value) > 12 && Number(value) < 45}
          />
        </div>
        <div>
          <div>Accept number between 12 and 45</div>
          <NumPad.Number
            onChange={setValue}
            inline
            label="Inline"
            value={value}
            negative
            decimal
            // keyValidator={(value) => Number(value) < 45}
          />
        </div>
      </div> */}

      <div style={{ marginTop: 24 }}>
        <strong>Last value:</strong> {String(value)}
      </div>
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");
createRoot(container).render(<App />);
