import fs from 'fs';

import { Canvas, CanvasRenderingContext2D, Image } from 'canvas';

import { ICanvasPainter, IStroke } from './interfaces';

/**
 * Canvas painter.
 */
export default class CanvasPainter implements ICanvasPainter {
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
   */
  public clear(style: string | CanvasGradient | CanvasPattern): CanvasPainter {
    this.fillRectangle([0, 0, this.canvas.width, this.canvas.height], style);
    return this;
  }

  /**
   * Draws an image.
   *
   * @param image Image
   * @param at Canvas position
   * @param source Optional subrectangle of the source image
   */
  public drawImage(
    image: Image,
    [x, y]: [number, number],
    source: [number, number, number, number] | undefined = undefined,
  ): CanvasPainter {
    if (source === undefined) {
      this.ctx.drawImage(image, x, y);
    } else {
      const [sx, sy, sw, sh] = source;
      this.ctx.drawImage(image, sx, sy, sw, sh, x, y, sw, sh);
    }
    return this;
  }

  /**
   * Exports the canvas to a PNG file.
   *
   * @param path Path to export to
   */
  public export(path: string): CanvasPainter {
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
   */
  public fillRectangle(
    [x, y, w, h]: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern | undefined = undefined,
  ): CanvasPainter {
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
   */
  public setFillStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): CanvasPainter {
    this.ctx.fillStyle = style;
    return this;
  }

  /**
   * Sets the line width for subsequent strokes.
   *
   * @param width Width
   */
  public setLineWidth(width: number): CanvasPainter {
    this.ctx.lineWidth = width;
    return this;
  }

  /**
   * Sets the style for subsequent strokes.
   *
   * @param style Style
   */
  public setStrokeStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): CanvasPainter {
    this.ctx.strokeStyle = style;
    return this;
  }

  /**
   * Strokes a rectangle.
   *
   * @param rectangle X, Y, width and height to stroke
   * @param style Optional style to stroke with
   */
  strokeRectangle(
    [x, y, w, h]: [number, number, number, number],
    style: IStroke | undefined = undefined,
  ): CanvasPainter {
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
