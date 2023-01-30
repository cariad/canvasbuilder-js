import path from 'path';

import { loadImage } from 'canvas';

import { MockCanvasBuilder } from '.';

const fox = path.join('test-data', 'pexels-erik-mclean-4157094.jpg');

test('logs the initialize event', () => {
  const mock = new MockCanvasBuilder().initialize(400, 300);

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
  ]);
});

test('logs the clear event', () => {
  const mock = new MockCanvasBuilder().initialize(400, 300).clear('green');

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'clear', style: 'green' },
  ]);
});

test('logs the drawImage event', async () => {
  const image = await loadImage(fox);

  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .drawImage(image, [1, 2]);

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    {
      function: 'drawImage',
      image,
      at: [1, 2],
      source: undefined,
    },
  ]);
});

test('logs the drawImage (with subrectangle) event', async () => {
  const image = await loadImage(fox);

  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .drawImage(image, [1, 2], [3, 4, 5, 6]);

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    {
      function: 'drawImage',
      image,
      at: [1, 2],
      source: [3, 4, 5, 6],
    },
  ]);
});

test('logs the export event', () => {
  const mock = new MockCanvasBuilder().initialize(400, 300).export('foo.png');

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'export', to: 'foo.png' },
  ]);
});

test('logs the fillRectangle (with default style) event', () => {
  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .fillRectangle([0, 1, 2, 3]);

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'fillRectangle', rectangle: [0, 1, 2, 3], style: undefined },
  ]);
});

test('logs the fillRectangle (with overridden style) event ', () => {
  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .fillRectangle([0, 1, 2, 3], 'red');

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'fillRectangle', rectangle: [0, 1, 2, 3], style: 'red' },
  ]);
});

test('logs the setFillStyle event', () => {
  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .setFillStyle('purple');

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'setFillStyle', style: 'purple' },
  ]);
});

test('logs the setLineWidth event', () => {
  const mock = new MockCanvasBuilder().initialize(400, 300).setLineWidth(36);

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'setLineWidth', width: 36 },
  ]);
});

test('logs the setStrokeStyle event', () => {
  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .setStrokeStyle('green');

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'setStrokeStyle', style: 'green' },
  ]);
});

test('logs the strokeRectangle (with default style) event', () => {
  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .strokeRectangle([0, 1, 2, 3]);

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    { function: 'strokeRectangle', rectangle: [0, 1, 2, 3], style: undefined },
  ]);
});

test('logs the strokeRectangle (with overridden style) event', () => {
  const mock = new MockCanvasBuilder()
    .initialize(400, 300)
    .strokeRectangle([0, 1, 2, 3], { style: 'red' });

  expect(mock.events).toEqual([
    { function: 'initialize', width: 400, height: 300 },
    {
      function: 'strokeRectangle',
      rectangle: [0, 1, 2, 3],
      style: { style: 'red' },
    },
  ]);
});
