/**
 * Prepared canvas builder.
 */
export default interface IPreparedCanvasBuilder {
  /**
   * Clears the canvas.
   *
   * @param style Style to clear to
   * @returns This canvas builder
   */
  clear(style: string | CanvasGradient | CanvasPattern): IPreparedCanvasBuilder;

  /**
   * Exports the canvas to a PNG file.
   *
   * @param to Path to export to
   * @returns This canvas builder
   */
  export(to: string): IPreparedCanvasBuilder;

  /**
   * Fills a rectangle.
   *
   * @param rect X, Y, width and height to fill
   * @returns This canvas builder
   */
  fillRectangle(rect: [number, number, number, number]): IPreparedCanvasBuilder;

  /**
   * Fills a rectangle.
   *
   * @param rectangle X, Y, width and height to fill
   * @param style Style to fill with
   * @returns This canvas builder
   */
  fillRectangle(
    rectangle: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern | undefined,
  ): IPreparedCanvasBuilder;

  /**
   * Sets the style for subsequent fills.
   *
   * @param style Style
   * @returns This canvas builder
   */
  setFillStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): IPreparedCanvasBuilder;
}
