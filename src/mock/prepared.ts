import {
  ClearEvent,
  ExportEvent,
  Event,
  FillRectangleEvent,
  SetFillStyleEvent,
  SetStrokeStyleEvent,
  SetLineWidthEvent,
  StrokeRectangleEvent,
} from './events';

import { IPreparedCanvasBuilder, IStroke } from '../interfaces';

/**
 * Mock canvas builder.
 *
 * Use this in your unit tests then interrogate the .events property to assert
 * your expected calls.
 */
class MockPreparedCanvasBuilder implements IPreparedCanvasBuilder {
  /**
   * Observed events.
   */
  public readonly events: Event[];

  constructor(log: Event[]) {
    this.events = log;
  }

  public clear(
    style: string | CanvasGradient | CanvasPattern,
  ): MockPreparedCanvasBuilder {
    const event: ClearEvent = { function: 'clear', style };
    this.events.push(event);
    return this;
  }

  public export(to: string): MockPreparedCanvasBuilder {
    const event: ExportEvent = { function: 'export', to };
    this.events.push(event);
    return this;
  }

  public fillRectangle(
    rectangle: [number, number, number, number],
    style: string | CanvasGradient | CanvasPattern | undefined = undefined,
  ): MockPreparedCanvasBuilder {
    const event: FillRectangleEvent = {
      function: 'fillRectangle',
      rectangle,
      style,
    };

    this.events.push(event);
    return this;
  }

  public setFillStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): MockPreparedCanvasBuilder {
    const event: SetFillStyleEvent = { function: 'setFillStyle', style };
    this.events.push(event);
    return this;
  }

  public setLineWidth(width: number): MockPreparedCanvasBuilder {
    const event: SetLineWidthEvent = { function: 'setLineWidth', width };
    this.events.push(event);
    return this;
  }

  public setStrokeStyle(
    style: string | CanvasGradient | CanvasPattern,
  ): MockPreparedCanvasBuilder {
    const event: SetStrokeStyleEvent = { function: 'setStrokeStyle', style };
    this.events.push(event);
    return this;
  }

  strokeRectangle(
    rectangle: [number, number, number, number],
    style: IStroke | undefined = undefined,
  ): MockPreparedCanvasBuilder {
    const event: StrokeRectangleEvent = {
      function: 'strokeRectangle',
      rectangle,
      style,
    };

    this.events.push(event);
    return this;
  }
}

export default MockPreparedCanvasBuilder;
