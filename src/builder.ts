import { createCanvas, registerFont } from 'canvas';

import ICanvasBuilder from './interfaces/builder';
import ICanvasPainter from './interfaces/painter';
import IFont from './interfaces/font';
import IOptions from './interfaces/options';
import CanvasPainter from './painter';

/**
 * Canvas builder.
 */
export default class CanvasBuilder implements ICanvasBuilder {
  private readonly options: IOptions;

  private height: number;

  private width: number;

  /**
   * Constructs a new canvas builder.
   *
   * @param options Optional options.
   */
  constructor(options: IOptions | undefined = undefined) {
    this.height = 600;
    this.options = options ?? { debug: false };
    this.width = 800;
  }

  /**
   * Builds the canvas to allow painting.
   */
  public build(): ICanvasPainter {
    const canvas = createCanvas(this.width, this.height);
    return new CanvasPainter(canvas, this.options);
  }

  /**
   * Registers a font to use during painting.
   *
   * @param localPath Path to the font file
   * @param style Style (CSS) properties
   */
  public registerFont(localPath: string, style: IFont): CanvasBuilder {
    registerFont(localPath, style);
    return this;
  }

  /**
   * Sets the canvas size.
   *
   * @param width Width
   * @param height Height
   */
  public setSize(width: number, height: number): CanvasBuilder {
    // Don't create the canvas yet: font registration must happen first. Hold
    // off for now then create the canvas just in time.
    this.height = height;
    this.width = width;
    return this;
  }
}
