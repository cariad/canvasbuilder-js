import IPreparedCanvasBuilder from '../interfaces/prepared-canvas-builder';
import { ExportEvent, Event } from './events';

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

  public export(to: string): MockPreparedCanvasBuilder {
    const event: ExportEvent = { function: 'export', to };
    this.events.push(event);
    return this;
  }
}

export default MockPreparedCanvasBuilder;
