export function drawRacingLine(
  ctx: CanvasRenderingContext2D,
  line: { x: number; y: number }[],
) {
  ctx.strokeStyle = "#474747";
  ctx.lineWidth = 200;
  ctx.beginPath();

  line.forEach((p, i) => {
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
  });

  ctx.stroke();

  ctx.fillStyle = "#fff";
  line.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}
