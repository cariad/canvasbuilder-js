import { createCanvas } from 'canvas';

import ICanvasBuilder from './interfaces/canvas-builder';
import PreparedCanvasBuilder from './prepared';

/**
 * Canvas builder.
 */
export default class CanvasBuilder implements ICanvasBuilder {
  /**
   * Initialises the canvas.
   *
   * @param width Canvas width
   * @param height Canvas height
   * @returns This canvas builder
   */
  // eslint-disable-next-line class-methods-use-this
  public initialize(width: number, height: number): PreparedCanvasBuilder {
    const canvas = createCanvas(width, height);
    return new PreparedCanvasBuilder(canvas);
  }
}
