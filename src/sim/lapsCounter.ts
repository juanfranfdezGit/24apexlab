import { LapState } from "engine/types";

export function createLapCounter(): LapState {
  return {
    lap: 0,
    prevT: 0,
    lastLapTime: 0,
    totalTime: 0,
    firstLapValid: false, // ignoramos primera vuelta
    bestLapTime: undefined, // añadimos mejor vuelta
  };
}

function crossedFinish(prevT: number, t: number, finishT: number) {
  if (prevT <= t) {
    return prevT < finishT && t >= finishT;
  }
  return prevT < finishT || t >= finishT;
}

export function updateLapCounter(
  lapState: LapState,
  currentT: number,
  finishIndex: number,
  pathLength: number,
  deltaTime: number,
) {
  const finishT = finishIndex / pathLength;

  // --- Suma tiempo de vuelta actual ---
  lapState.lastLapTime += deltaTime;

  // --- Detecta cruce de meta ---
  if (crossedFinish(lapState.prevT, currentT, finishT)) {
    if (!lapState.firstLapValid) {
      // Primera vuelta incompleta → ignorar
      lapState.firstLapValid = true;
      lapState.lastLapTime = 0; // reinicia el temporizador
    } else {
      // Vuelta completa → sumar tiempos
      lapState.totalTime += lapState.lastLapTime;

      // --- Actualiza mejor vuelta ---
      if (
        !lapState.bestLapTime ||
        lapState.lastLapTime < lapState.bestLapTime
      ) {
        lapState.bestLapTime = lapState.lastLapTime;
      }

      lapState.lastLapTime = 0;
      lapState.lap += 1;
    }
  }

  lapState.prevT = currentT;
}
