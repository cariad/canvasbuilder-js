import IPreparedCanvasBuilder from './prepared-canvas-builder';

/**
 * Canvas builder.
 */
export default interface ICanvasBuilder {
  /**
   * Initialises the canvas.
   *
   * @param width Canvas width
   * @param height Canvas height
   * @returns This canvas builder
   */
  initialize(width: number, height: number): IPreparedCanvasBuilder;
}
