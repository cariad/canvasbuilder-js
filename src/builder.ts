import { registerFont } from 'canvas';

import CanvasPainter from './painter';
import ICanvasBuilder from './interfaces/builder';
import ICanvasPainter from './interfaces/painter';
import IFont from './interfaces/font';
import IOptions from './interfaces/options';

import { Event, RegisterFontEvent, SetSizeEvent } from './events';

/**
 * Canvas builder.
 */
export default class CanvasBuilder implements ICanvasBuilder {
  /**
   * Observed events.
   */
  public readonly events: Event[];

  private readonly options: IOptions;

  private height: number;

  private width: number;

  /**
   * Constructs a new canvas builder.
   *
   * @param options Optional options.
   */
  constructor(options: IOptions | undefined = undefined) {
    this.events = [];
    this.height = 600;
    this.options = options ?? { debug: false };
    this.width = 800;
  }

  /**
   * Builds the canvas to allow painting.
   */
  public build(): ICanvasPainter {
    return new CanvasPainter(
      this.events,
      this.height,
      this.options,
      this.width,
    );
  }

  /**
   * Registers a font to use during painting.
   *
   * @param path Path to the font file
   * @param style Style (CSS) properties
   */
  public registerFont(path: string, style: IFont): CanvasBuilder {
    registerFont(path, style);

    const event: RegisterFontEvent = { function: 'registerFont', path, style };
    this.events.push(event);

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

    const event: SetSizeEvent = { function: 'setSize', height, width };
    this.events.push(event);

    return this;
  }
}
