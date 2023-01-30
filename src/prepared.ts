import fs from 'fs';

import { Canvas, CanvasRenderingContext2D } from 'canvas';

import { IPreparedCanvasBuilder, IStroke } from './interfaces';

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
    this.fillRectangle([0, 0, this.canvas.width, this.canvas.height], style);
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

  /**
   * Fills a rectangle.
   *
   * @param rect X, Y, width and height to fill
   * @param style Optional style to fill with
   * @returns This canvas builder
   */
  public fillRectangle(
    [x, y, w, h]: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern | undefined = undefined,
  ): PreparedCanvasBuilder {
    const currFillStyle = this.ctx.fillStyle;
    if (style !== undefined) this.ctx.fillStyle = style;
    this.ctx.fillRect(x, y, w, h);
    if (style !== undefined) this.ctx.fillStyle = currFillStyle;
    return this;
  }

  /**
   * Sets the style for subsequent fills.
   *
   * @param style Style
   * @returns This canvas builder
   */
  public setFillStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): PreparedCanvasBuilder {
    this.ctx.fillStyle = style;
    return this;
  }

  /**
   * Sets the line width for subsequent strokes.
   *
   * @param width Width
   * @returns This canvas builder
   */
  public setLineWidth(width: number): PreparedCanvasBuilder {
    this.ctx.lineWidth = width;
    return this;
  }

  /**
   * Sets the style for subsequent strokes.
   *
   * @param style Style
   * @returns This canvas builder
   */
  public setStrokeStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): PreparedCanvasBuilder {
    this.ctx.strokeStyle = style;
    return this;
  }

  /**
   * Strokes a rectangle.
   *
   * @param rectangle X, Y, width and height to stroke
   * @param style Optional style to stroke with
   * @returns This canvas builder
   */
  strokeRectangle(
    [x, y, w, h]: [number, number, number, number],
    style: IStroke | undefined = undefined,
  ): PreparedCanvasBuilder {
    const currStyle = this.ctx.strokeStyle;
    const currWidth = this.ctx.lineWidth;

    if (style?.style !== undefined) this.ctx.strokeStyle = style.style;
    if (style?.width !== undefined) this.ctx.lineWidth = style.width;

    this.ctx.strokeRect(x, y, w, h);

    if (style?.style !== undefined) this.ctx.strokeStyle = currStyle;
    if (style?.width !== undefined) this.ctx.lineWidth = currWidth;

    return this;
  }
}
