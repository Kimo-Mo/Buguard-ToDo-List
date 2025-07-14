import type { ReactNode } from "react";
import { AntDProvider } from "./AntDProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ColorsProvider } from "./ColorsProvider";

export const UIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <ColorsProvider>
        <AntDProvider>{children}</AntDProvider>
      </ColorsProvider>
    </ThemeProvider>
  );
};
