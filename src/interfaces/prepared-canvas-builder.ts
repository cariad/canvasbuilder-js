/**
 * Prepared canvas builder.
 */
export default interface IPreparedCanvasBuilder {
  /**
   * Exports the canvas to a PNG file.
   *
   * @param to Path to export to
   * @returns This canvas builder
   */
  export(to: string): IPreparedCanvasBuilder;
}
