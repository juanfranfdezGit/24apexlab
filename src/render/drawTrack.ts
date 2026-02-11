export type Point = { x: number; y: number };

const finishImg = new Image();
finishImg.src = "/assets/interface/meta.jpg";

export function drawTrack(
  ctx: CanvasRenderingContext2D,
  line: Point[],
  finishIndex: number,
) {
  ctx.strokeStyle = "#474747";
  ctx.lineWidth = 120;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  line.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  if (finishImg.complete && line.length > finishIndex + 1) {
    const p0 = line[finishIndex];
    const p1 = line[finishIndex + 1];

    const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);

    ctx.save();
    ctx.translate(p0.x, p0.y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.drawImage(finishImg, -60, -10, 120, 20);
    ctx.restore();
  }
}
