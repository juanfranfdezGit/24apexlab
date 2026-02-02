import { createContext, useContext, useState } from "react";

type UIContextType = {
  started: boolean;
  startApp: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const [circuit, setCircuit] = useState(false);
  const [car, setCar] = useState(false);

  const startApp = () => setStarted(true);

  return (
    <UIContext.Provider value={{ started, startApp }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
