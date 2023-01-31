import MockCanvasPainter from './painter';

import { InitializeEvent, Event } from './events';
import { ICanvasBuilder } from '../interfaces';

/**
 * Mock canvas builder.
 *
 * Use this in your unit tests then interrogate the .events property to assert
 * your expected calls.
 */
export default class MockCanvasBuilder implements ICanvasBuilder {
  /**
   * Observed events.
   */
  public readonly events: Event[];

  constructor() {
    this.events = [];
  }

  public initialize(width: number, height: number): MockCanvasPainter {
    const event: InitializeEvent = { function: 'initialize', height, width };
    this.events.push(event);
    return new MockCanvasPainter(this.events);
  }
}
