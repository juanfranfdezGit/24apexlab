import { createWorld, updateWorld } from "../sim/world";
import { computeAISensors } from "../sim/sensors";
import { renderWorld } from "../render/renderer";
import { createAISocket } from "../net/aiSocket";
import { createInput } from "../input/input";
import type { Car } from "engine/types";
import { Point } from "sim/path";

export function startLoop(
  canvas: HTMLCanvasElement,
  racingLine: Point[],
  selectedCar: Car | null,
) {
  const ctx = canvas.getContext("2d")!;
  const world = createWorld(racingLine);
  const getInput = createInput();

  let aiAction = { lateralTarget: 0, throttle: 0 };

  const { sendState } = createAISocket("ws://localhost:8000/ws", (a) => {
    aiAction = a;
  });

  const carImage = new Image();
  carImage.src = selectedCar?.img || "";

  function frame() {
    const input = getInput();

    updateWorld(world, input, aiAction);

    const sensors = computeAISensors(world);
    sendState(sensors);

    renderWorld(ctx, canvas, world, carImage);

    requestAnimationFrame(frame);
  }

  carImage.onload = frame;
}
