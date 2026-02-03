export type Point = { x: number; y: number };

export function drawRacingLine(ctx: CanvasRenderingContext2D, line: Point[]) {
  ctx.strokeStyle = "#474747";
  ctx.lineWidth = 200;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  line.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  ctx.strokeStyle = "#cfcfcf";
  ctx.lineWidth = 2;

  ctx.beginPath();
  line.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
}
