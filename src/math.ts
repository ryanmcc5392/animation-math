export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/* 
  linear interpolation between two points
*/

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

export function easeIn(t: number): number {
  return clamp(t * t, 0, 1);
}

export function easeOut(t: number): number {
  return clamp(1 - (1 - t) * (1 - t), 0, 1);
}

export function easeInOut(t: number): number {
  t = clamp(t, 0, 1);
  return t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t;
}

/* 
  current: Current position 
  target: Target position
  delta: Time between frames from the Clock class
  smoothTime: How long it should take to reach the target (in seconds)
*/

export function damp(current: number, target: number, delta: number, smoothTime: number): number {
  const t = 1 - Math.exp(-delta / smoothTime);
  return current + (target - current) * t;
}

/* 
  start: starting psotion,
  end: ending position 
  duration: time to transition
  onUpdate: callbackFn on frame update 
  onComplete: optional callbackFn for completion
  timingFn: Optional, defaults to linear
*/

export function animateLerp(
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => any,
  onComplete?: (end: number) => any,
  timingFn: (t: number) => number = t => t // default to linear
) {
  const startTime = performance.now();

  function tick() {
    const now = performance.now();
    const elapsed = (now - startTime) / 1000;
    const t = clamp(elapsed / duration, 0, 1);
    const easedT = timingFn(t);
    const value = lerp(start, end, easedT);

    onUpdate(value);

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      onComplete?.(end);
    }
  }

  requestAnimationFrame(tick);
}

/* 
  Returns a normalized value from 
    •	Left edge = -0.5
    •	Right edge = +0.5
    •	Top = -0.5
    •	Bottom = +0.5
  Best for parallax effects
  ClientX: from a mouse/pointer event
  ClientY: from a mouse/pointer event
  width: canvas/container width
  height: canvas/container height
*/

export function cursorParallax(clientX: number, clientY: number, width: number, height: number) {
  const cursorX = clientX / width - 0.5;
  const cursorY = clientY / height - 0.5;
  return {x: cursorX, y: cursorY};
}

/* 
  Returns a normalized value from 
    •	Bottom Left = (-1, -1)
    •	Top Right = (1, 1)
  Best for THREE.Raycaster or mapping mouse to 3D space
  ClientX: from a mouse/pointer event
  ClientY: from a mouse/pointer event
  width: canvas/container width
  height: canvas/container height
*/

export function cursor3D(clientX: number, clientY: number, width: number, height: number) {
  const cursorX = clientX / width - 0.5;
  const cursorY = clientY / height - 0.5;
  return {x: cursorX, y: cursorY};
}

/*
  Returns clamped pixel values within canvas bounds.
    • Top Left = (0, 0)
    • Bottom Right = (canvasWidth, canvasHeight)
  Great for drawing on a 2D canvas where pixel precision matters.
  ClientX: from a mouse/pointer event
  ClientY: from a mouse/pointer event
  width: canvas/container width
  height: canvas/container height
*/

export function clampCursorToCanvas(clientX: number, clientY: number, width: number, height: number) {
  const x = Math.max(0, Math.min(width, clientX));
  const y = Math.max(0, Math.min(height, clientY));
  return { x, y };
}
