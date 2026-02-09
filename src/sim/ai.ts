import { lerpPath, getHeading } from "./path";

export interface AI {
  t: number;
  speed: number;
  maxSpeed: number;
  offset: number;
}

export interface AIAction {
  lateralTarget: number;
  throttle: number;
}

export function createAI(): AI {
  return { t: 0.3, speed: 0.0001, maxSpeed: 0.0018, offset: 0 };
}

export function updateAI(
  ai: AI,
  racingLine: { x: number; y: number }[],
  action: AIAction,
  trackWidth: number,
) {
  const heading = getHeading(racingLine, ai.t);

  const target = action.lateralTarget ?? 0;
  const lateralSpeed = 1.0;
  if (ai.offset < target)
    ai.offset = Math.min(ai.offset + lateralSpeed, target);
  if (ai.offset > target)
    ai.offset = Math.max(ai.offset - lateralSpeed, target);

  ai.speed = action.throttle * 0.002;
  ai.speed = Math.max(0.0003, Math.min(ai.speed, ai.maxSpeed));

  ai.t += ai.speed;
  if (ai.t > 1) ai.t -= 1;
}

export function getAIPosition(ai: AI, path: { x: number; y: number }[]) {
  const base = lerpPath(path, ai.t);
  const heading = getHeading(path, ai.t);

  const perpX = Math.cos(heading + Math.PI / 2);
  const perpY = Math.sin(heading + Math.PI / 2);

  return {
    x: base.x + perpX * ai.offset,
    y: base.y + perpY * ai.offset,
  };
}

export function getAIAngle(ai: AI, path: { x: number; y: number }[]) {
  return getHeading(path, ai.t);
}
