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

type AIState = {
  t: number;
  speed: number;
  curvatureAhead: number;
};

type Action = "accelerate" | "brake" | "none";
