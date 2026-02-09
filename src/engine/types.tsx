import type { Player } from "../sim/player";
import type { AI } from "../sim/ai";

export interface Point {
  x: number;
  y: number;
}

export interface WorldState {
  player: Player;
  ai: AI;
  racingLine: Point[];
  trackWidth: number;
}

export type Car = {
  id: number;
  name: string;
  img: string;
  imgSelect: string;
};

export type Circuit = {
  id: number;
  name: string;
  svgPath: string;
  imgSelect: string;
  svgPathId: number;
};

export type carState = {
  t: number;
  speed: number;
  fuel: number;
  lap: number;
};

export interface InputState {
  accelerating: boolean;
  braking: boolean;
}
