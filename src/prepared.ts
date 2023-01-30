import fs from 'fs';

import { Canvas, CanvasRenderingContext2D } from 'canvas';

import IPreparedCanvasBuilder from './interfaces/prepared-canvas-builder';

/**
 * Prepared canvas builder.
 */
export default class PreparedCanvasBuilder implements IPreparedCanvasBuilder {
  private readonly canvas: Canvas;

  private readonly ctx: CanvasRenderingContext2D;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Exports the canvas to a PNG file.
   *
   * @param path Path to export to
   * @returns This canvas builder
   */
  public export(path: string): PreparedCanvasBuilder {
    const out = fs.createWriteStream(path);
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    return this;
  }
}
