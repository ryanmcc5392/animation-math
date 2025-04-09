/** 
  Basic clamp between a min and max
**/
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** 
  linear interpolation between two points
**/
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

/** 
  eases in between two points
**/
export function easeIn(t: number): number {
  return clamp(t * t, 0, 1);
}
/** 
  eases out between two points
**/
export function easeOut(t: number): number {
  return clamp(1 - (1 - t) * (1 - t), 0, 1);
}
/** 
  eases in and out between two points
**/
export function easeInOut(t: number): number {
  t = clamp(t, 0, 1);
  return t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t;
}

/** 
  * @param current: Current position 
  * @param target: Target position
  * @param delta: Time between frames from the Clock class
  * @param smoothTime: How long it should take to reach the target (in seconds)
**/
export function damp(current: number, target: number, delta: number, smoothTime: number): number {
  const t = 1 - Math.exp(-delta / smoothTime);
  return current + (target - current) * t;
}

/**
  provides a linear interpolated value every frame 
  * @param start: starting psotion,
  * @param end: ending position 
  * @param duration: time to transition
  * @param onUpdate: callbackFn on frame update 
  * @param onComplete: optional callbackFn for completion
  * @param timingFn: Optional, defaults to linear
**/
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

/** 
  Best for parallax effects
  * @param ClientX: from a mouse/pointer event
  * @param ClientY: from a mouse/pointer event
  * @param width: canvas/container width
  * @param height: canvas/container height
  * @Returns a normalized value from 
    •	Left edge = -0.5
    •	Right edge = +0.5
    •	Top = -0.5
    •	Bottom = +0.5
**/
export function cursorParallax(clientX: number, clientY: number, width: number, height: number) {
  const cursorX = clientX / width - 0.5;
  const cursorY = clientY / height - 0.5;
  return {x: cursorX, y: cursorY};
}

/**
  Best for THREE.Raycaster or mapping mouse to 3D space
  * @param ClientX: from a mouse/pointer event
  * @param ClientY: from a mouse/pointer event
  * @param width: canvas/container width
  * @param height: canvas/container height
  * @Returns a normalized value from 
    •	Bottom Left = (-1, -1)
    •	Top Right = (1, 1)
**/

export function cursor3D(clientX: number, clientY: number, width: number, height: number) {
  const cursorX = (clientX / width) * 2 - 1;
  const cursorY = -(clientY / height) * 2 + 1;
  return {x: cursorX, y: cursorY};
}

/** 
  Great for drawing on a 2D canvas where pixel precision matters.
  * @param ClientX: from a mouse/pointer event
  * @param ClientY: from a mouse/pointer event
  * @param width: canvas/container width
  * @param height: canvas/container height
  * @Returns clamped pixel values within canvas bounds.
    • Top Left = (0, 0)
    • Bottom Right = (canvasWidth, canvasHeight)
**/
export function clampCursorToCanvas(clientX: number, clientY: number, width: number, height: number) {
  const x = Math.max(0, Math.min(width, clientX));
  const y = Math.max(0, Math.min(height, clientY));
  return { x, y };
}

/**
 * Converts a value in a given range to a normalized value between 0 and 1.
 * @param value The value to normalize.
 * @param min The minimum of the input range.
 * @param max The maximum of the input range.
 * @returns A number between 0 and 1.
 */
export function normalize(value: number, min: number, max: number): number {
  if (min === max) return 0; // avoid divide by zero
  return (value - min) / (max - min);
}

/**
 * Maps a number from one range to another.
 * @param value The number to map.
 * @param inMin The lower bound of the input range.
 * @param inMax The upper bound of the input range.
 * @param outMin The lower bound of the output range.
 * @param outMax The upper bound of the output range.
 * @returns The mapped number.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMin === inMax) return outMin; // avoid divide by zero
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Converts degrees to radians.
 * @param degrees The angle in degrees.
 * @returns The angle in radians.
 */
export function deg2rad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 * @param radians The angle in radians.
 * @returns The angle in degrees.
 */
export function rad2deg(radians: number): number {
  return radians * (180 / Math.PI);
}
