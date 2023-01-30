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
}
