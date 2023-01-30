/**
 * Stroke.
 */
export default interface IStroke {
  /**
   * Optional stroke style.
   */
  style?: string | CanvasGradient | CanvasPattern;

  /**
   * Optional stroke width.
   */
  width?: number;
}
