import { useEffect, useRef, useState } from "react";
import { useUI } from "context/UIContext";
import { svgPathToPoints } from "sim/svgToPoints";
import { startLoop } from "../../canvas/loop";
import CarActions from "./interface/carActions";
import Help from "./interface/help";
import CircuitLogo from "./interface/circuitLogo";

export default function Game() {
  const { selectedCircuit, selectedCar } = useUI();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (!selectedCircuit?.svgPath) return;

    fetch(selectedCircuit.svgPath)
      .then((res) => res.text())
      .then(setSvgContent);
  }, [selectedCircuit]);

  useEffect(() => {
    if (!svgContent || !canvasRef.current) return;

    const path = document.querySelector<SVGPathElement>(
      "#path" + selectedCircuit?.svgPathId,
    );
    if (!path) {
      console.error(
        "No se encuentra #path" + selectedCircuit?.svgPathId + " en el SVG",
      );
      console.log("SVG Content:", svgContent);
      return;
    }

    const racingLine = svgPathToPoints(path, 500);

    console.log("Racing line points:", racingLine.length);

    startLoop(canvasRef.current, racingLine, selectedCar);
  }, [svgContent, selectedCar]);

  return (
    <>
      <section className="circuitSection flex">
        <div className="back"></div>

        <div
          className="circuitSvg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        <div className="canvas">
          <canvas ref={canvasRef} width={4600} height={2400} />
        </div>

        <div className="interface">
          <CarActions />
          <Help />
          {/* <Laps /> */}
          <CircuitLogo
            logo={selectedCircuit?.imgSelect}
            alt={selectedCircuit?.name}
          />
        </div>
      </section>
    </>
  );
}
