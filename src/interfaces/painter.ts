import { Image } from 'canvas';

import IStroke from './stroke';

/**
 * Canvas painter.
 */
export default interface ICanvasPainter {
  /**
   * Clears the canvas.
   *
   * @param style Style to clear to
   */
  clear(style: string | CanvasGradient | CanvasPattern): ICanvasPainter;

  /**
   * Draws an image.
   *
   * @param image Image
   * @param at Canvas position
   */
  drawImage(image: Image, at: [number, number]): ICanvasPainter;

  /**
   * Draws an image.
   *
   * @param image Image
   * @param at Canvas position
   * @param source Subrectangle of the source image
   */
  drawImage(
    image: Image,
    at: [number, number],
    source: [number, number, number, number],
  ): ICanvasPainter;

  /**
   * Exports the canvas to a PNG file.
   *
   * @param to Path to export to
   */
  export(to: string): ICanvasPainter;

  /**
   * Fills a rectangle.
   *
   * @param rect X, Y, width and height to fill
   */
  fillRectangle(rect: [number, number, number, number]): ICanvasPainter;

  /**
   * Fills a rectangle.
   *
   * @param rectangle X, Y, width and height to fill
   * @param style Style to fill with
   */
  fillRectangle(
    rectangle: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern,
  ): ICanvasPainter;

  /**
   * Draws filled text.
   *
   * @param text Text
   * @param at Position
   */
  fillText(text: string, at: [number, number]): ICanvasPainter;

  /**
   * Sets the style for subsequent fills.
   *
   * @param style Style
   */
  setFillStyle(style: string | CanvasGradient | CanvasPattern): ICanvasPainter;

  /**
   * Sets the font family for subsequent text drawing.
   *
   * @param family Font family
   */
  setFontFamily(family: string): ICanvasPainter;

  /**
   * Sets the font size for subsequent text drawing.
   *
   * @param size Size in pixels
   */
  setFontSize(size: number): ICanvasPainter;

  /**
   * Sets the line width for subsequent strokes.
   *
   * @param width Width
   */
  setLineWidth(width: number): ICanvasPainter;

  /**
   * Sets the style for subsequent strokes.
   *
   * @param style Style
   */
  setStrokeStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): ICanvasPainter;

  /**
   * Strokes a rectangle.
   *
   * @param rectangle X, Y, width and height to stroke
   */
  strokeRectangle(rectangle: [number, number, number, number]): ICanvasPainter;

  /**
   * Strokes a rectangle.
   *
   * @param rectangle X, Y, width and height to stroke
   * @param style Style to stroke with
   */
  strokeRectangle(
    rectangle: [number, number, number, number],
    style: IStroke,
  ): ICanvasPainter;
}
