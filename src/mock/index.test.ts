import path from 'path';

import { loadImage } from 'canvas';

import { MockCanvasBuilder } from '.';

const fox = path.join('test-data', 'pexels-erik-mclean-4157094.jpg');

test('logs the clear event', () => {
  const mock = new MockCanvasBuilder().build().clear('green');
  expect(mock.events).toEqual([{ function: 'clear', style: 'green' }]);
});

test('logs the drawImage event', async () => {
  const image = await loadImage(fox);
  const mock = new MockCanvasBuilder().build().drawImage(image, [1, 2]);

  expect(mock.events).toEqual([
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
    .build()
    .drawImage(image, [1, 2], [3, 4, 5, 6]);

  expect(mock.events).toEqual([
    {
      function: 'drawImage',
      image,
      at: [1, 2],
      source: [3, 4, 5, 6],
    },
  ]);
});

test('logs the export event', () => {
  const mock = new MockCanvasBuilder().build().export('foo.png');
  expect(mock.events).toEqual([{ function: 'export', to: 'foo.png' }]);
});

test('logs the fillRectangle (with default style) event', () => {
  const mock = new MockCanvasBuilder().build().fillRectangle([0, 1, 2, 3]);

  expect(mock.events).toEqual([
    { function: 'fillRectangle', rectangle: [0, 1, 2, 3], style: undefined },
  ]);
});

test('logs the fillRectangle (with overridden style) event ', () => {
  const mock = new MockCanvasBuilder()
    .build()
    .fillRectangle([0, 1, 2, 3], 'red');

  expect(mock.events).toEqual([
    { function: 'fillRectangle', rectangle: [0, 1, 2, 3], style: 'red' },
  ]);
});

test('logs the fillText event ', () => {
  const mock = new MockCanvasBuilder().build().fillText('foo', [1, 2]);

  expect(mock.events).toEqual([
    { function: 'fillText', text: 'foo', at: [1, 2] },
  ]);
});

test('logs the registerFont event', () => {
  const mock = new MockCanvasBuilder().registerFont('foo.ttf', {
    family: 'Foo',
  });

  expect(mock.events).toEqual([
    {
      function: 'registerFont',
      localPath: 'foo.ttf',
      style: {
        family: 'Foo',
      },
    },
  ]);
});

test('logs the setFillStyle event', () => {
  const mock = new MockCanvasBuilder().build().setFillStyle('purple');
  expect(mock.events).toEqual([{ function: 'setFillStyle', style: 'purple' }]);
});

test('logs the setFontFamily event', () => {
  const mock = new MockCanvasBuilder().build().setFontFamily('foo');
  expect(mock.events).toEqual([{ function: 'setFontFamily', family: 'foo' }]);
});

test('logs the setFontSize event', () => {
  const mock = new MockCanvasBuilder().build().setFontSize(13);
  expect(mock.events).toEqual([{ function: 'setFontSize', size: 13 }]);
});

test('logs the setLineWidth event', () => {
  const mock = new MockCanvasBuilder().build().setLineWidth(36);
  expect(mock.events).toEqual([{ function: 'setLineWidth', width: 36 }]);
});

test('logs the setSize event', () => {
  const mock = new MockCanvasBuilder().setSize(400, 300);

  expect(mock.events).toEqual([
    { function: 'setSize', width: 400, height: 300 },
  ]);
});

test('logs the setStrokeStyle event', () => {
  const mock = new MockCanvasBuilder().build().setStrokeStyle('green');
  expect(mock.events).toEqual([{ function: 'setStrokeStyle', style: 'green' }]);
});

test('logs the strokeRectangle (with default style) event', () => {
  const mock = new MockCanvasBuilder().build().strokeRectangle([0, 1, 2, 3]);

  expect(mock.events).toEqual([
    { function: 'strokeRectangle', rectangle: [0, 1, 2, 3], style: undefined },
  ]);
});

test('logs the strokeRectangle (with overridden style) event', () => {
  const mock = new MockCanvasBuilder()
    .build()
    .strokeRectangle([0, 1, 2, 3], { style: 'red' });

  expect(mock.events).toEqual([
    {
      function: 'strokeRectangle',
      rectangle: [0, 1, 2, 3],
      style: { style: 'red' },
    },
  ]);
});
