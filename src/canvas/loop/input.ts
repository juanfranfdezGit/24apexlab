export function createInput() {
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

  return () => ({ accelerating, braking });
}
