import { drawRacingLine } from "./drawLine";
import { drawCar } from "./drawCar";
import {
  createPlayer,
  updatePlayer,
  getPlayerPosition,
  getPlayerAngle,
} from "./loop/player";
import {
  createAI,
  updateAI,
  getAIPosition,
  getAIAngle,
  AIAction,
} from "./loop/ai";
import { createInput } from "./loop/input";
import { createAISocket } from "./loop/aiSocket";
import type { Car } from "context/types";

export function startLoop(
  canvas: HTMLCanvasElement,
  racingLine: { x: number; y: number }[],
  selectedCar: Car | null,
) {
  const ctx = canvas.getContext("2d")!;
  let animationId: number;

  const player = createPlayer();
  const ai = createAI();
  const getInput = createInput();
  let aiAction: AIAction = { lateralTarget: 0, throttle: 0 };

  const trackWidth = 120;

  const carImage = new Image();
  carImage.src = selectedCar?.img || "";

  const { sendState } = createAISocket("ws://localhost:8000/ws", (action) => {
    aiAction = action;
  });

  function update() {
    const { accelerating, braking } = getInput();

    updatePlayer(player, accelerating, braking);

    updateAI(ai, racingLine, aiAction, trackWidth);

    const aiPos = getAIPosition(ai, racingLine);
    const heading = getAIAngle(ai, racingLine);
    const perpX = Math.cos(heading + Math.PI / 2);
    const perpY = Math.sin(heading + Math.PI / 2);

    const leftDist = trackWidth / 2 - ai.offset;
    const rightDist = trackWidth / 2 + ai.offset;
    const lookahead = 0.05;
    const nextPoint =
      racingLine[
        Math.floor((ai.t + lookahead) * (racingLine.length - 1)) %
          racingLine.length
      ];
    const dx = nextPoint.x - (aiPos.x + ai.offset * perpX);
    const dy = nextPoint.y - (aiPos.y + ai.offset * perpY);
    const frontDist = Math.sqrt(dx * dx + dy * dy);

    sendState({
      lateralOffset: ai.offset,
      leftDist,
      rightDist,
      frontDist,
      speed: ai.speed,
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRacingLine(ctx, racingLine);

    update();

    const playerPos = getPlayerPosition(player, racingLine);
    const playerAngle = getPlayerAngle(player, racingLine);

    const aiPos = getAIPosition(ai, racingLine);
    const aiAngle = getAIAngle(ai, racingLine);

    drawCar(ctx, carImage, playerPos, playerAngle);
    drawCar(ctx, carImage, aiPos, aiAngle);

    animationId = requestAnimationFrame(frame);
  }

  carImage.onload = frame;

  return () => cancelAnimationFrame(animationId);
}
