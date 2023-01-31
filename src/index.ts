import { createCanvas, registerFont } from 'canvas';

import CanvasPainter from './painter';

import { ICanvasBuilder, ICanvasPainter, IFont } from './interfaces';

/**
 * Canvas builder.
 */
export default class CanvasBuilder implements ICanvasBuilder {
  private height = 600;

  private width = 800;

  /**
   * Builds the canvas to allow painting.
   */
  public build(): ICanvasPainter {
    const canvas = createCanvas(this.width, this.height);
    return new CanvasPainter(canvas);
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
