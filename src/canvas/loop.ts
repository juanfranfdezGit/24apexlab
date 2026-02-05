import { drawRacingLine } from "./drawLine";
import { drawCar } from "./drawCar";
import { lerpPath, getHeading } from "../sim/path";
import type { Car } from "context/types";

export function startLoop(
  canvas: HTMLCanvasElement,
  racingLine: { x: number; y: number }[],
  selectedCar: Car | null,
) {
  const ctx = canvas.getContext("2d")!;
  let animationId: number;

  const carImage = new Image();
  carImage.src = selectedCar?.img || "";

  const player = {
    t: 0,
    speed: 0,
    maxSpeed: 0.002,
    accel: 0.0001,
    brake: 0.00005,
    friction: 0.995,
  };

  const ai = {
    t: 0.3,
    speed: 0.0001,
    maxSpeed: 0.0018,
  };

  function aiPolicy(state: {
    t: number;
    speed: number;
    curvatureAhead: number;
  }): "accelerate" | "brake" | "none" {
    if (state.curvatureAhead > 0.2) return "brake";
    if (state.speed < 0.001) return "accelerate";
    return "none";
  }

  let accelerating = false;
  let braking = false;

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") accelerating = true;
    if (e.code === "ControlLeft") braking = true;
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "Space") accelerating = false;
    if (e.code === "ControlLeft") braking = false;
  });

  function update() {
    if (accelerating) {
      player.speed += player.accel;
    } else if (braking) {
      player.speed -= player.brake;
    } else {
      player.speed *= player.friction;
    }

    player.speed = Math.max(0, Math.min(player.speed, player.maxSpeed));
    player.t += player.speed;
    if (player.t > 1) player.t = 0;

    const a = lerpPath(racingLine, ai.t);
    const b = lerpPath(racingLine, Math.min(ai.t + 0.01, 1));
    const bc = Math.atan2(b.y - a.y, b.x - a.x);

    const next = lerpPath(racingLine, Math.min(ai.t + 0.02, 1));
    const nextHeading = Math.atan2(next.y - b.y, next.x - b.x);

    const curvatureAhead = Math.abs(nextHeading - bc);

    const state = { t: ai.t, speed: ai.speed, curvatureAhead };
    const action = aiPolicy(state);

    if (action === "accelerate") ai.speed += 0.0001;
    if (action === "brake") ai.speed -= 0.00005;

    ai.speed = Math.max(0.0001, Math.min(ai.speed, ai.maxSpeed));
    ai.t += ai.speed;
    if (ai.t > 1) ai.t = 0;
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRacingLine(ctx, racingLine);

    update();

    const playerPos = lerpPath(racingLine, player.t);
    const playerAngle = getHeading(racingLine, player.t);

    const aiPos = lerpPath(racingLine, ai.t);
    const aiAngle = getHeading(racingLine, ai.t);

    drawCar(ctx, carImage, playerPos, playerAngle);
    drawCar(ctx, carImage, aiPos, aiAngle);

    animationId = requestAnimationFrame(frame);
  }

  carImage.onload = frame;

  return () => cancelAnimationFrame(animationId);
}
