import fs from 'fs';

import { Canvas, CanvasRenderingContext2D, Image, createCanvas } from 'canvas';

import ICanvasPainter from './interfaces/painter';
import IOptions from './interfaces/options';
import IStroke from './interfaces/stroke';

import {
  DrawImageEvent,
  ExportEvent,
  Event,
  FillRectangleEvent,
  FillTextEvent,
  SetFillStyleEvent,
  SetFontFamilyEvent,
  SetFontSizeEvent,
  SetStrokeStyleEvent,
  SetLineWidthEvent,
  StrokeRectangleEvent,
} from './events';

type OptionalRectangle = [number, number, number, number] | undefined;

/**
 * Canvas painter.
 */
export default class CanvasPainter implements ICanvasPainter {
  /**
   * Observed events.
   */
  public readonly events: Event[];

  private readonly canvas: Canvas;

  private readonly ctx: CanvasRenderingContext2D;

  private readonly height: number;

  private readonly width: number;

  private readonly operations: Promise<void>[];

  private readonly options: IOptions;

  private fontFamily = 'sans-serif';

  private fontSize = 10;

  constructor(
    events: Event[],
    height: number,
    options: IOptions,
    width: number,
  ) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');

    this.height = height;
    this.width = width;
    this.events = events;
    this.operations = [];
    this.options = options;
  }

  /**
   * Clears the canvas.
   *
   * @param style Style to clear to
   */
  public clear(style: string | CanvasGradient | CanvasPattern): CanvasPainter {
    this.operations.push(this.promiseToClear(style));
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
    image: Promise<Image>,
    at: [number, number],
    source: [number, number, number, number] | undefined = undefined,
  ): CanvasPainter {
    if (source === undefined) {
      this.operations.push(this.promiseToDrawImage(image, at));
    } else {
      this.operations.push(this.promiseToDrawImage(image, at, source));
    }
    return this;
  }

  /**
   * Exports the canvas to a PNG file.
   *
   * @param path Path to export to
   */
  public export(path: string): Promise<CanvasPainter> {
    const operations = [...this.operations];
    this.operations.splice(0, this.operations.length);

    return new Promise<CanvasPainter>((resolve, reject) => {
      Promise.all(operations)
        .then(() => this.promiseToExport(path))
        .then(() => resolve(this))
        .catch(reject);
    });
  }

  /**
   * Fills a rectangle.
   *
   * @param rectangle X, Y, width and height to fill
   * @param style Optional style to fill with
   */
  public fillRectangle(
    rectangle: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern | undefined = undefined,
  ): CanvasPainter {
    if (style === undefined) {
      this.operations.push(this.promiseToFillRectangle(rectangle));
    } else {
      this.operations.push(this.promiseToFillRectangle(rectangle, style));
    }
    return this;
  }

  /**
   * Draws filled text.
   *
   * @param text Text
   * @param at Position
   */
  public fillText(text: string, at: [number, number]): CanvasPainter {
    this.operations.push(this.promiseToFillText(text, at));
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
    this.operations.push(this.promiseToSetFillStyle(style));
    return this;
  }

  /**
   * Sets the font family for subsequent text drawing.
   *
   * @param family Font family
   */
  public setFontFamily(family: string): CanvasPainter {
    this.operations.push(this.promiseToSetFontFamily(family));
    return this;
  }

  /**
   * Sets the font size for subsequent text drawing.
   *
   * @param size Size in pixels
   */
  public setFontSize(size: number): CanvasPainter {
    this.operations.push(this.promiseToSetFontSize(size));
    return this;
  }

  /**
   * Sets the line width for subsequent strokes.
   *
   * @param width Width
   */
  public setLineWidth(width: number): CanvasPainter {
    this.operations.push(this.promiseToSetLineWidth(width));
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
    this.operations.push(this.promiseToSetStrokeStyle(style));
    return this;
  }

  /**
   * Strokes a rectangle.
   *
   * @param rectangle X, Y, width and height to stroke
   * @param style Optional style to stroke with
   */
  public strokeRectangle(
    rectangle: [number, number, number, number],
    style: IStroke | undefined = undefined,
  ): CanvasPainter {
    if (style === undefined) {
      this.operations.push(this.promiseToStrokeRectangle(rectangle));
    } else {
      this.operations.push(this.promiseToStrokeRectangle(rectangle, style));
    }
    return this;
  }

  // Private functions

  private promiseToClear(
    style: string | CanvasGradient | CanvasPattern,
  ): Promise<void> {
    return this.promiseToFillRectangle([0, 0, this.width, this.height], style);
  }

  private promiseToDrawImage(
    image: Promise<Image>,
    at: [number, number],
    src: [number, number, number, number] | undefined = undefined,
  ): Promise<void> {
    const atCopy: [number, number] = [...at];
    const srcCopy: OptionalRectangle = src === undefined ? undefined : [...src];

    return image.then((i) => {
      if (srcCopy === undefined) {
        if (this.options.debug) {
          console.debug('canvasbuilder: Drawing image', i.src, 'at', atCopy);
        }

        this.ctx.drawImage(i, atCopy[0], atCopy[1]);
      } else {
        if (this.options.debug) {
          console.debug(
            'canvasbuilder: Drawing image',
            i.src,
            'subrectangle',
            srcCopy,
            'at',
            atCopy,
          );
        }

        const [sx, sy, sw, sh] = srcCopy;
        this.ctx.drawImage(i, sx, sy, sw, sh, atCopy[0], atCopy[1], sw, sh);
      }

      const event: DrawImageEvent = {
        function: 'drawImage',
        at: atCopy,
        image: i.src,
        source: srcCopy,
      };

      this.events.push(event);
    });
  }

  private promiseToExport(to: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.options.debug) {
        console.debug('canvasbuilder: Exporting to', to);
      }
      const out = fs.createWriteStream(to);
      const stream = this.canvas.createPNGStream();
      stream.pipe(out);

      const event: ExportEvent = { function: 'export', to };
      this.events.push(event);

      resolve();
    });
  }

  private promiseToFillRectangle(
    rectangle: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern | undefined = undefined,
  ): Promise<void> {
    const rectangleCopy: [number, number, number, number] = [...rectangle];

    return new Promise<void>((resolve) => {
      const [x, y, w, h] = rectangleCopy;

      const currFillStyle = this.ctx.fillStyle;
      if (style !== undefined) this.ctx.fillStyle = style;
      this.ctx.fillRect(x, y, w, h);
      if (style !== undefined) this.ctx.fillStyle = currFillStyle;

      const event: FillRectangleEvent = {
        function: 'fillRectangle',
        rectangle: rectangleCopy,
        style,
      };

      this.events.push(event);

      resolve();
    });
  }

  private promiseToFillText(text: string, at: [number, number]): Promise<void> {
    const atCopy: [number, number] = [...at];

    return new Promise<void>((resolve) => {
      this.ctx.fillText(text, atCopy[0], atCopy[1]);

      const event: FillTextEvent = { function: 'fillText', text, at: atCopy };
      this.events.push(event);

      resolve();
    });
  }

  private promiseToSetFillStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      this.ctx.fillStyle = style;

      const event: SetFillStyleEvent = { function: 'setFillStyle', style };
      this.events.push(event);

      resolve();
    });
  }

  private promiseToSetFontFamily(family: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.fontFamily = family;
      this.updateFont();

      const event: SetFontFamilyEvent = { function: 'setFontFamily', family };
      this.events.push(event);

      resolve();
    });
  }

  private promiseToSetFontSize(size: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.fontSize = size;
      this.updateFont();

      const event: SetFontSizeEvent = { function: 'setFontSize', size };
      this.events.push(event);

      resolve();
    });
  }

  private promiseToSetLineWidth(width: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.ctx.lineWidth = width;

      const event: SetLineWidthEvent = { function: 'setLineWidth', width };
      this.events.push(event);

      resolve();
    });
  }

  private promiseToSetStrokeStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      this.ctx.strokeStyle = style;

      const event: SetStrokeStyleEvent = { function: 'setStrokeStyle', style };
      this.events.push(event);

      resolve();
    });
  }

  private promiseToStrokeRectangle(
    rectangle: [number, number, number, number],
    style: IStroke | undefined = undefined,
  ): Promise<void> {
    const rectangleCopy: [number, number, number, number] = [...rectangle];

    return new Promise<void>((resolve) => {
      const [x, y, w, h] = rectangleCopy;

      const currStyle = this.ctx.strokeStyle;
      const currWidth = this.ctx.lineWidth;

      if (style?.style !== undefined) this.ctx.strokeStyle = style.style;
      if (style?.width !== undefined) this.ctx.lineWidth = style.width;

      this.ctx.strokeRect(x, y, w, h);

      if (style?.style !== undefined) this.ctx.strokeStyle = currStyle;
      if (style?.width !== undefined) this.ctx.lineWidth = currWidth;

      const event: StrokeRectangleEvent = {
        function: 'strokeRectangle',
        rectangle: rectangleCopy,
        style,
      };

      this.events.push(event);

      resolve();
    });
  }

  private updateFont(): void {
    this.ctx.font = `${this.fontSize}px "${this.fontFamily}"`;
  }
}
