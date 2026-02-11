import { LapState } from "engine/types";
import { lerpPath, getHeading } from "./path";
import { createLapCounter, updateLapCounter } from "./lapsCounter";

export interface AI {
  t: number;
  speed: number;
  maxSpeed: number;
  offset: number;
  lapState: LapState;
  currentTrace: { x: number; y: number }[]; // trazada actual
  bestBiasTrace: { x: number; y: number }[]; // trazada óptima
}

export interface AIAction {
  lateralTarget: number;
  throttle: number;
}

export function createAI(finishIndex: number, pathLength: number): AI {
  return {
    t: (finishIndex - 15) / pathLength,
    speed: 0.0001,
    maxSpeed: 0.0018,
    offset: 0,
    lapState: createLapCounter(),
    currentTrace: [],
    bestBiasTrace: [],
  };
}

export function updateAI(
  ai: AI,
  racingLine: { x: number; y: number }[],
  action: AIAction,
  trackWidth: number,
  finishIndex: number,
) {
  // --- Ajusta lateral más visible ---
  const target = action.lateralTarget ?? 0;
  const lateralSpeed = trackWidth * 0.02; // 2% del ancho de pista por tick
  if (ai.offset < target)
    ai.offset = Math.min(ai.offset + lateralSpeed, target);
  if (ai.offset > target)
    ai.offset = Math.max(ai.offset - lateralSpeed, target);

  // --- Actualiza velocidad ---
  ai.speed = action.throttle * 0.002;
  ai.speed = Math.max(0.0003, Math.min(ai.speed, ai.maxSpeed));

  // --- Avanza en la pista ---
  ai.t += ai.speed;
  if (ai.t > 1) ai.t -= 1;

  // --- Guarda posición actual en la trazada ---
  const base = lerpPath(racingLine, ai.t);
  const heading = getHeading(racingLine, ai.t);
  const perpX = Math.cos(heading + Math.PI / 2);
  const perpY = Math.sin(heading + Math.PI / 2);

  const aiPos = {
    x: base.x + perpX * ai.offset,
    y: base.y + perpY * ai.offset,
  };
  ai.currentTrace.push(aiPos);

  // --- Actualiza lap counter ---
  const deltaTime = 1 / 60;
  const prevLap = ai.lapState.lap;
  updateLapCounter(
    ai.lapState,
    ai.t,
    finishIndex,
    racingLine.length,
    deltaTime,
  );

  // --- Si termina la vuelta y mejora la mejor vuelta ---
  if (ai.lapState.lap > prevLap) {
    if (
      !ai.bestBiasTrace.length ||
      ai.lapState.lastLapTime < (ai.lapState.bestLapTime ?? Infinity)
    ) {
      ai.bestBiasTrace = [...ai.currentTrace]; // guarda trazada como mejor vuelta
      ai.lapState.bestLapTime = ai.lapState.lastLapTime;
      console.log(`New best lap: ${ai.lapState.bestLapTime.toFixed(2)}s`);
    }
    ai.currentTrace = []; // reinicia para siguiente vuelta
  }
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
