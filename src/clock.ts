export class Clock {
  private startTime: number;
  private lastTime: number;

  constructor() {
    const now = performance.now();
    this.startTime = now;
    this.lastTime = now;
  }

  /** Time since the clock started, in seconds */
  getElapsedTime(): number {
    return (performance.now() - this.startTime) / 1000;
  }

  /** Time since last frame (updates internal state), in seconds */
  getDelta(): number {
    const now = performance.now();
    const delta = (now - this.lastTime) / 1000;
    this.lastTime = now;
    return delta;
  }

  /** Reset the clock */
  reset() {
    const now = performance.now();
    this.startTime = now;
    this.lastTime = now;
  }
}
