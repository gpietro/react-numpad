import type { FC, ReactNode } from "react";
import React from "react";

interface WrapperProps {
  position: string;
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ position, children }) => (
  <div className="fixed top-0 left-0 w-full h-full p-0 m-0 z-50">
    <div className={`flex w-full h-full items-${position} justify-center`}>
      {position.startsWith("start") || position === "fullscreen" ? (
        <div className={`relative ${position === "center" ? "h-screen" : ""}`}>
          {children}
        </div>
      ) : (
        <div className={"relative"}>
          <div
            className={
              "absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"
            }
          />
          <div
            className={`relative ${position === "center" ? "h-screen" : ""}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Wrapper;

export const Content: FC<{ position: string; children: ReactNode }> = ({
  position,
  children,
}) => (
  <div className={`relative ${position === "center" ? "h-screen" : ""}`}>
    {children}
  </div>
);
