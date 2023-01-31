import { createCanvas } from 'canvas';

import CanvasPainter from './painter';

import { ICanvasBuilder } from './interfaces';

/**
 * Canvas builder.
 */
export default class CanvasBuilder implements ICanvasBuilder {
  /**
   * Initialises the canvas.
   *
   * @param width Canvas width
   * @param height Canvas height
   */
  // eslint-disable-next-line class-methods-use-this
  public initialize(width: number, height: number): CanvasPainter {
    const canvas = createCanvas(width, height);
    return new CanvasPainter(canvas);
  }
}
