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

  // Fixed timestep for stable simulation
  // 60fps
  const fixedDelta = 1 / 60;
  let lastTime = performance.now();
  let accumulator = 0;

  function frame(now: number) {
    const deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    accumulator += deltaTime;

    const input = getInput();

    while (accumulator >= fixedDelta) {
      updateWorld(world, input, aiAction);

      const sensors = computeAISensors(world);
      sendState(sensors);

      accumulator -= fixedDelta;
    }

    // Independent rendering for smoother visuals
    renderWorld(ctx, canvas, world, carImage);

    requestAnimationFrame(frame);
  }

  carImage.onload = () => requestAnimationFrame(frame);
}
