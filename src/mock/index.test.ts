import { MockCanvasBuilder } from '.';

test('logs the initialize event', () => {
  const mock = new MockCanvasBuilder().initialize(400, 300);

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
  ]);
});

test('logs the export event', () => {
  const mock = new MockCanvasBuilder().initialize(400, 300).export('foo.png');

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'export', to: 'foo.png' },
  ]);
});
