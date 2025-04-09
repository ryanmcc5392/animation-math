export class Clock {
  private startTime: number;
  private lastTime: number;
  private delta: number = 0;
  private fps: number = 0;

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
    this.delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    // Update FPS on every frame
    this.fps = 1 / this.delta;
    return this.delta;
  }

  /** Estimated current frames per second */
  getFPS(): number {
    return Math.round(this.fps);
  }

  /** Reset the clock */
  reset() {
    const now = performance.now();
    this.startTime = now;
    this.lastTime = now;
    this.fps = 0;
  }
}
