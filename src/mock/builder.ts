import ICanvasBuilder from '../interfaces/builder';
import IFont from '../interfaces/font';
import MockCanvasPainter from './painter';

import { Event, RegisterFontEvent, SetSizeEvent } from './events';

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

  public build(): MockCanvasPainter {
    return new MockCanvasPainter(this.events);
  }

  public registerFont(localPath: string, style: IFont): MockCanvasBuilder {
    const event: RegisterFontEvent = {
      function: 'registerFont',
      localPath,
      style,
    };

    this.events.push(event);
    return this;
  }

  public setSize(width: number, height: number): MockCanvasBuilder {
    const event: SetSizeEvent = { function: 'setSize', height, width };
    this.events.push(event);
    return this;
  }
}
