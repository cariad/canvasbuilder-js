import ICanvasPainter from './painter';
import IFont from './font';

/**
 * Canvas builder.
 */
export default interface ICanvasBuilder {
  /**
   * Builds the canvas to allow painting.
   */
  build(): ICanvasPainter;

  /**
   * Registers a font to use during painting.
   *
   * @param localPath Path to the font file
   * @param style Style (CSS) properties
   */
  registerFont(localPath: string, style: IFont): ICanvasBuilder;

  /**
   * Initialises the canvas.
   *
   * @param width Canvas width
   * @param height Canvas height
   */
  setSize(width: number, height: number): ICanvasBuilder;
}
