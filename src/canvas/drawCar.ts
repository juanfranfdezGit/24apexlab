export function drawCar(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  pos: { x: number; y: number },
  angle: number,
) {
  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(angle + Math.PI / 120);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();
}
