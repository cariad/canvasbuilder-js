import fs from 'fs';

import { Canvas, CanvasRenderingContext2D } from 'canvas';

import { IPreparedCanvasBuilder } from './interfaces';

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
   * Clears the canvas.
   *
   * @param style Style to clear to
   * @returns This canvas builder
   */
  public clear(
    style: string | CanvasGradient | CanvasPattern,
  ): IPreparedCanvasBuilder {
    const currFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = style;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = currFillStyle;
    return this;
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
