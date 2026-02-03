import { drawRacingLine } from "./drawLine";
import { drawCar } from "./drawCar";
import { lerpPath, getHeading } from "../sim/path";
import type { Car } from "context/types";

export function startLoop(
  canvas: HTMLCanvasElement,
  racingLine: { x: number; y: number }[],
  car: Car | null,
) {
  const ctx = canvas.getContext("2d")!;
  let t = 0;

  ctx.fillStyle = "red";
  ctx.fillRect(100, 100, 10, 10);

  const carImage = new Image();
  let carReady = false;

  if (car?.img) {
    carImage.src = car.img;

    carImage.onload = () => {
      carReady = true;
    };
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRacingLine(ctx, racingLine);

    if (carReady && racingLine.length > 1) {
      const pos = lerpPath(racingLine, t);
      const angle = getHeading(racingLine, t);

      drawCar(ctx, carImage, pos, angle);

      t += 0.0005;
      if (t > 1) t = 0;
    }

    requestAnimationFrame(frame);
  }

  frame();
}
