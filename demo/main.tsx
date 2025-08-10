import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import NumPad from "../lib";
import "../lib/index.css";

function App() {
  const [value, setValue] = useState<string | number>("");

  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        padding: 24,
      }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>React Numpad Demo</h1>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div>
          <NumPad.Number
            onChange={setValue}
            label="Basic"
            position="center"
            value={value}
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
      </div>

      <div style={{ marginTop: 24 }}>
        <strong>Last value:</strong> {String(value)}
      </div>
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");
createRoot(container).render(<App />);
