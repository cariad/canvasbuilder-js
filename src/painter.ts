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

  private readonly options: IOptions;

  private fontFamily = 'sans-serif';

  private fontSize = 10;

  private operations: Promise<ICanvasPainter>;

  constructor(
    events: Event[],
    height: number,
    options: IOptions,
    width: number,
  ) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');
    this.events = events;
    this.height = height;
    this.width = width;

    this.operations = new Promise<ICanvasPainter>((resolve) => {
      resolve(this);
    });

    this.options = options;
  }

  /**
   * Clears the canvas.
   *
   * @param style Style to clear to
   */
  public clear(style: string | CanvasGradient | CanvasPattern): CanvasPainter {
    return this.fillRectangle([0, 0, this.width, this.height], style);
  }

  /**
   * Draws an image.
   *
   * @param image Image
   * @param at Canvas position
   * @param src Optional source image subrectangle
   */
  public drawImage(
    image: Promise<Image>,
    at: [number, number],
    src: [number, number, number, number] | undefined = undefined,
  ): CanvasPainter {
    const atCopy: [number, number] = [...at];
    const srcCopy: OptionalRectangle = src === undefined ? undefined : [...src];

    this.operations = this.operations.then((p) =>
      image.then((i) => {
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

        return p;
      }),
    );

    return this;
  }

  /**
   * Exports the canvas to a PNG file.
   *
   * @param to Path to export to
   */
  public export(to: string): Promise<CanvasPainter> {
    // eslint-disable-next-line prefer-destructuring
    const operations = this.operations;
    this.operations = new Promise<ICanvasPainter>((resolve) => {
      resolve(this);
    });

    return new Promise<CanvasPainter>((resolve, reject) => {
      operations
        .then(() => {
          if (this.options.debug) {
            console.debug('canvasbuilder: Exporting to', to);
          }
          const out = fs.createWriteStream(to);
          const stream = this.canvas.createPNGStream();
          stream.pipe(out);

          const event: ExportEvent = { function: 'export', to };
          this.events.push(event);

          resolve(this);
        })
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
    const rectangleCopy: [number, number, number, number] = [...rectangle];
    this.operations = this.operations.then((p) => {
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
      return p;
    });

    return this;
  }

  /**
   * Draws filled text.
   *
   * @param text Text
   * @param at Position
   */
  public fillText(text: string, at: [number, number]): CanvasPainter {
    const atCopy: [number, number] = [...at];

    this.operations = this.operations.then((p) => {
      this.ctx.fillText(text, atCopy[0], atCopy[1]);

      const event: FillTextEvent = { function: 'fillText', text, at: atCopy };
      this.events.push(event);

      return p;
    });

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
    this.operations = this.operations.then((p) => {
      this.ctx.fillStyle = style;
      const event: SetFillStyleEvent = { function: 'setFillStyle', style };
      this.events.push(event);
      return p;
    });

    return this;
  }

  /**
   * Sets the font family for subsequent text drawing.
   *
   * @param family Font family
   */
  public setFontFamily(family: string): CanvasPainter {
    this.operations = this.operations.then((p) => {
      this.fontFamily = family;
      this.updateFont();

      const event: SetFontFamilyEvent = { function: 'setFontFamily', family };
      this.events.push(event);

      return p;
    });

    return this;
  }

  /**
   * Sets the font size for subsequent text drawing.
   *
   * @param size Size in pixels
   */
  public setFontSize(size: number): CanvasPainter {
    this.operations = this.operations.then((p) => {
      this.fontSize = size;
      this.updateFont();

      const event: SetFontSizeEvent = { function: 'setFontSize', size };
      this.events.push(event);

      return p;
    });

    return this;
  }

  /**
   * Sets the line width for subsequent strokes.
   *
   * @param width Width
   */
  public setLineWidth(width: number): CanvasPainter {
    this.operations = this.operations.then((p) => {
      this.ctx.lineWidth = width;
      const event: SetLineWidthEvent = { function: 'setLineWidth', width };
      this.events.push(event);
      return p;
    });

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
    this.operations = this.operations.then((p) => {
      this.ctx.strokeStyle = style;

      const event: SetStrokeStyleEvent = { function: 'setStrokeStyle', style };
      this.events.push(event);
      return p;
    });

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
    const rectangleCopy: [number, number, number, number] = [...rectangle];

    this.operations = this.operations.then((p) => {
      const currStyle = this.ctx.strokeStyle;
      const currWidth = this.ctx.lineWidth;

      if (style?.style !== undefined) this.ctx.strokeStyle = style.style;
      if (style?.width !== undefined) this.ctx.lineWidth = style.width;

      this.ctx.strokeRect(
        rectangleCopy[0],
        rectangleCopy[1],
        rectangleCopy[2],
        rectangleCopy[3],
      );

      if (style?.style !== undefined) this.ctx.strokeStyle = currStyle;
      if (style?.width !== undefined) this.ctx.lineWidth = currWidth;

      const event: StrokeRectangleEvent = {
        function: 'strokeRectangle',
        rectangle: rectangleCopy,
        style,
      };

      this.events.push(event);
      return p;
    });

    return this;
  }

  // Private functions

  private updateFont(): void {
    this.ctx.font = `${this.fontSize}px "${this.fontFamily}"`;
  }
}
