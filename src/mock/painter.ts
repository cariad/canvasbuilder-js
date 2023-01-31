import { Image } from 'canvas';

import {
  ClearEvent,
  DrawImageEvent,
  ExportEvent,
  Event,
  FillRectangleEvent,
  FillTextEvent,
  SetFillStyleEvent,
  SetFontFamilyEvent,
  SetFontSizeEvent,
  SetStrokeStyleEvent,
  SetLineWidthEvent,
  StrokeRectangleEvent,
} from './events';

import { ICanvasPainter, IStroke } from '../interfaces';

/**
 * Mock canvas painter.
 *
 * Use this in your unit tests then interrogate the .events property to assert
 * your expected calls.
 */
export default class MockCanvasPainter implements ICanvasPainter {
  /**
   * Observed events.
   */
  public readonly events: Event[];

  constructor(log: Event[]) {
    this.events = log;
  }

  public clear(
    style: string | CanvasGradient | CanvasPattern,
  ): MockCanvasPainter {
    const event: ClearEvent = { function: 'clear', style };
    this.events.push(event);
    return this;
  }

  public drawImage(
    image: Image,
    at: [number, number],
    source: [number, number, number, number] | undefined = undefined,
  ): MockCanvasPainter {
    const event: DrawImageEvent = { function: 'drawImage', image, at, source };
    this.events.push(event);
    return this;
  }

  public export(to: string): MockCanvasPainter {
    const event: ExportEvent = { function: 'export', to };
    this.events.push(event);
    return this;
  }

  public fillRectangle(
    rectangle: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern | undefined = undefined,
  ): MockCanvasPainter {
    const event: FillRectangleEvent = {
      function: 'fillRectangle',
      rectangle,
      style,
    };

    this.events.push(event);
    return this;
  }

  public fillText(text: string, at: [number, number]): MockCanvasPainter {
    const event: FillTextEvent = { function: 'fillText', text, at };
    this.events.push(event);
    return this;
  }

  public setFillStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): MockCanvasPainter {
    const event: SetFillStyleEvent = { function: 'setFillStyle', style };
    this.events.push(event);
    return this;
  }

  public setFontFamily(family: string): MockCanvasPainter {
    const event: SetFontFamilyEvent = { function: 'setFontFamily', family };
    this.events.push(event);
    return this;
  }

  public setFontSize(size: number): MockCanvasPainter {
    const event: SetFontSizeEvent = { function: 'setFontSize', size };
    this.events.push(event);
    return this;
  }

  public setLineWidth(width: number): MockCanvasPainter {
    const event: SetLineWidthEvent = { function: 'setLineWidth', width };
    this.events.push(event);
    return this;
  }

  public setStrokeStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): MockCanvasPainter {
    const event: SetStrokeStyleEvent = { function: 'setStrokeStyle', style };
    this.events.push(event);
    return this;
  }

  strokeRectangle(
    rectangle: [number, number, number, number],
    style: IStroke | undefined = undefined,
  ): MockCanvasPainter {
    const event: StrokeRectangleEvent = {
      function: 'strokeRectangle',
      rectangle,
      style,
    };

    this.events.push(event);
    return this;
  }
}
