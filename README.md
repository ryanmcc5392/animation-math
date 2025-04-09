# 📦 `animation-math` – Math + Time Utilities for JS/TS

A tiny, dependency-free collection of utility functions for animation, easing, interpolation, cursor mapping, and frame timing with a `Clock` class. Great for creative coding, canvas work, and lightweight game dev.

---

[GitHub Repository](https://github.com/ryanmcc5392/animation-math)

---

## Contributing

We welcome contributions! Please check out our [Contributing Guide](./CONTRIBUTING.md) for more details.

---

## 📐 Installation

```bash
npm install animation-math
```

---

## 🧮 Math Utilities

### `clamp(value, min, max)`
Clamp a number between a min and max value.

```ts
clamp(12, 0, 10); // → 10
```

---

### `lerp(a, b, t)`
Linear interpolation between two values.

```ts
lerp(0, 100, 0.5); // → 50
```

---

### `normalize(value, min, max)`
Converts a number from a range into a value between 0 and 1.

```ts
normalize(75, 50, 100); // → 0.5
```
```ts
normalize(value: number, min: number, max: number): number
```

---

### `mapRange(value, inMin, inMax, outMin, outMax)`
Maps a number from one range to another.

```ts
mapRange(0.5, 0, 1, 0, 100); // → 50
```
```ts
mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number
```

---

### `deg2rad(degrees)`
Converts radians to degrees.

```ts
deg2rad(180); // → 3.141592...
```
```ts
deg2rad(degrees: number): number
```

---

### `rad2deg(radians)`
Converts radians to degrees.

```ts
rad2deg(Math.PI); // → 180
```
```ts
rad2deg(radians: number): number
```

---

### Easing Functions

All easing functions clamp `t` between 0 and 1.

- `easeIn(t)`
- `easeOut(t)`
- `easeInOut(t)`

```ts
easeIn(0.5);     // → 0.25
easeOut(0.5);    // → 0.75
easeInOut(0.5);  // → 0.5
```

---

### `damp(current, target, delta, smoothTime)`
Smoothly moves a value toward a target using an exponential decay curve.

```ts
// Smooth movement, e.g., physics or camera smoothing
damp(currentPos, targetPos, deltaTime, 0.15);
```

---

## ⏱️ Animation

### `animateLerp(start, end, duration, onUpdate, onComplete?, timingFn?)`

Smoothly interpolates between two values over time using `requestAnimationFrame`.

```ts
animateLerp(0, 100, 2, (val) => {
  console.log(val); // runs every frame for 2s
}, () => {
  console.log('done!');
}, easeInOut);
```

---

## 🖱️ Cursor Utils

### `cursorParallax(clientX, clientY, width, height)`

Returns a value from `(-0.5, -0.5)` to `(0.5, 0.5)` – great for parallax effects.

```ts
const { x, y } = cursorParallax(e.clientX, e.clientY, width, height);
```

---

### `cursor3D(clientX, clientY, width, height)`

Returns a value from `(-1, -1)` to `(1, 1)` – perfect for mapping to 3D space like `THREE.Raycaster`.

```ts
const { x, y } = cursor3D(e.clientX, e.clientY, width, height);
```

---

### `clampCursorToCanvas(clientX, clientY, width, height)`

Returns pixel coordinates clamped within the bounds of a canvas.

```ts
const { x, y } = clampCursorToCanvas(e.clientX, e.clientY, canvas.width, canvas.height);
```

---

## ⏰ Clock Class

Lightweight time tracker for frame timing.

```ts
const clock = new Clock();
function loop() {
  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  const fps = clock.getFPS();

  requestAnimationFrame(loop);
}
loop();
```

### Methods:
- `getElapsedTime()` – Seconds since start.
- `getDelta()` – Seconds since last call.
- `getFPS()` – Frames per second, makes debugging frame rate drops easier.
- `reset()` – Restart the clock.

---

## 📦 createPageBox(element)

Returns detailed layout and visibility information for a DOM element, useful for positioning, animation, or scroll behavior.

```ts
const el = document.getElementById('target');
const box = createPageBox(el);

console.log(box?.isInViewport, box?.centerX);
```

### Returned object includes:
- `width, height` -	Element's dimensions
- `top, left, bottom, right` - Page-relative bounding box
- `centerX, centerY` - Center point on page
- `relativeToViewport` - DOMRect from getBoundingClientRect()
- `relativeToPage` - Same, but with scroll offset corrected
- `isInViewport` - true if any part of the element is visible
- `isFullyVisible` - true if the element is fully within the viewport
- `viewportRatioX` - % of width in viewport (0–1)
- `viewportRatioY`- % of height in viewport (0–1)

---

## 📁 License

MIT
