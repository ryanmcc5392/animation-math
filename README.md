# 📦 `animation-math` – Math + Time Utilities for JS/TS

A tiny, dependency-free collection of utility functions for animation, easing, interpolation, cursor mapping, and frame timing with a `Clock` class. Great for creative coding, canvas work, and lightweight game dev.

---

[GitHub Repository](https://github.com/ryanmcc5392/animation-math)

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
- `getFPS()` – Frames per second.
- `reset()` – Restart the clock.

---

## 📁 License

MIT
