import { createContext, useContext, useState } from "react";
import type { Car, Circuit } from "./types";

type UIContextType = {
  started: boolean;
  startApp: () => void;
  selectedCar: Car | null;
  setSelectedCar: (car: Car) => void;
  selectedCircuit: Circuit | null;
  setSelectedCircuit: (circuit: Circuit) => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);

  const startApp = () => setStarted(true);

  return (
    <UIContext.Provider
      value={{
        started,
        startApp,
        selectedCar,
        setSelectedCar,
        selectedCircuit,
        setSelectedCircuit,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
