import ICanvasPainter from './painter';

/**
 * Canvas builder.
 */
export default interface ICanvasBuilder {
  /**
   * Initialises the canvas.
   *
   * @param width Canvas width
   * @param height Canvas height
   */
  initialize(width: number, height: number): ICanvasPainter;
}
