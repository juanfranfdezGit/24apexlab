import { createContext, useContext, useState, useEffect } from "react";
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
  const [selectedCar, setSelectedCarState] = useState<Car | null>(null);
  const [selectedCircuit, setSelectedCircuitState] = useState<Circuit | null>(
    null,
  );

  const setSelectedCar = (car: Car) => {
    setSelectedCarState(car);
    localStorage.setItem("selectedCar", JSON.stringify(car));
  };

  const setSelectedCircuit = (circuit: Circuit) => {
    setSelectedCircuitState(circuit);
    localStorage.setItem("selectedCircuit", JSON.stringify(circuit));
  };

  const startApp = () => {
    setStarted(true);
    localStorage.setItem("started", "true");
  };

  useEffect(() => {
    const storedStarted = localStorage.getItem("started");
    if (storedStarted === "true") setStarted(true);

    const storedCar = localStorage.getItem("selectedCar");
    if (storedCar) setSelectedCarState(JSON.parse(storedCar));

    const storedCircuit = localStorage.getItem("selectedCircuit");
    if (storedCircuit) setSelectedCircuitState(JSON.parse(storedCircuit));
  }, []);

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
