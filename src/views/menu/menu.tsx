import { useState } from "react";
import { useUI } from "context/UIContext";
import cars from "../../datas/cars.json";
import circuits from "../../datas/circuits.json";

export default function Menu() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [currentCircuitIndex, setCurrentCircuitIndex] = useState(0);

  const currentCar = cars[currentCarIndex];
  const currentCircuit = circuits[currentCircuitIndex];

  const { setSelectedCar, setSelectedCircuit, startApp } = useUI();

  const prevCar = () => {
    setCurrentCarIndex((prev) => (prev === 0 ? cars.length - 1 : prev - 1));
  };
  const prevCircuit = () => {
    setCurrentCircuitIndex((prev) =>
      prev === 0 ? circuits.length - 1 : prev - 1,
    );
  };

  const nextCar = () => {
    setCurrentCarIndex((prev) => (prev === cars.length - 1 ? 0 : prev + 1));
  };
  const nextCircuit = () => {
    setCurrentCircuitIndex((prev) =>
      prev === circuits.length - 1 ? 0 : prev + 1,
    );
  };

  const startGame = () => {
    setSelectedCar(currentCar);
    setSelectedCircuit(currentCircuit);
    startApp();
    console.log(currentCar, currentCircuit);
  };

  return (
    <section className="mainMenu flex">
      <div className="menuBack">
        <img src="/assets/images/menuBack.jpg" alt="background" />
      </div>
      <div className="menu flex">
        <div className="menuItem logo">
          <img src="/assets/logo.png" alt="logo" />
          <h1>24 Apex Lab</h1>
        </div>
        <div className="menuItem carSelect">
          <h2>Elige Coche</h2>
          <button className="prevButton" onClick={prevCar}>
            &lt;
          </button>
          <div className="selectItem flex" key={currentCar.id}>
            <h3>{currentCar.name}</h3>
            <img src={currentCar.imgSelect} alt={currentCar.name} />
          </div>
          <button className="nextButton" onClick={nextCar}>
            &gt;
          </button>
        </div>
        <div className="menuItem circuitSelect">
          <h2>Elige Circuito</h2>

          <button className="prevButton" onClick={prevCircuit}>
            &lt;
          </button>
          <div className="selectItem flex" key={currentCircuit.id}>
            <h3>{currentCircuit.name}</h3>
            <img
              src={currentCircuit.imgSelect}
              className="circuitLogo"
              alt={currentCircuit.name}
            />
          </div>
          <button className="nextButton" onClick={nextCircuit}>
            &gt;
          </button>
        </div>
        <div onClick={startGame} className="menuItem start flex">
          <p>Start!</p>
        </div>
      </div>
    </section>
  );
}
