import path from 'path';

import { loadImage } from 'canvas';

import { CanvasBuilder } from '.';

const fox = path.join('test-data', 'pexels-erik-mclean-4157094.jpg');
const rainbow = path.join('test-data', 'Rainbow2000.ttf');

const height = 300;
const width = 400;

test('renders an empty canvas', async () => {
  const to = path.join('renders', 'empty.png');

  const painter = await new CanvasBuilder()
    .setSize(width, height)
    .beginPainting()
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    { function: 'export', to },
  ]);
});

test('renders a cleared canvas', async () => {
  const to = path.join('renders', 'clear.png');

  const painter = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    { function: 'export', to },
  ]);
});

test('renders a filled rectangle with the default style', async () => {
  const to = path.join('renders', 'fill-default.png');

  const painter = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setFillStyle('black')
    .fillRectangle([150, 100, 100, 100])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    {
      function: 'setFillStyle',
      style: 'black',
    },
    {
      function: 'fillRectangle',
      rectangle: [150, 100, 100, 100],
    },
    { function: 'export', to },
  ]);
});

test('renders a filled rectangle with an overridden style', async () => {
  const to = path.join('renders', 'fill-overridden.png');

  const painter = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setFillStyle('black')
    .fillRectangle([150, 100, 100, 100], 'red')
    .fillRectangle([175, 125, 50, 50])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    {
      function: 'setFillStyle',
      style: 'black',
    },
    {
      function: 'fillRectangle',
      rectangle: [150, 100, 100, 100],
      style: 'red',
    },
    {
      function: 'fillRectangle',
      rectangle: [175, 125, 50, 50],
    },
    { function: 'export', to },
  ]);
});

test('renders a stroked rectangle with the default style', async () => {
  const to = path.join('renders', 'stroke-default.png');

  const painter = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([150, 100, 100, 100])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    { function: 'setStrokeStyle', style: 'black' },
    { function: 'setLineWidth', width: 6 },
    { function: 'strokeRectangle', rectangle: [150, 100, 100, 100] },
    { function: 'export', to },
  ]);
});

test('renders a stroked rectangle with an overridden style', async () => {
  const to = path.join('renders', 'stroke-overridden-style.png');

  const painter = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([130, 80, 100, 100], { style: 'red' })
    .strokeRectangle([170, 120, 100, 100])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    { function: 'setStrokeStyle', style: 'black' },
    { function: 'setLineWidth', width: 6 },
    {
      function: 'strokeRectangle',
      rectangle: [130, 80, 100, 100],
      style: { style: 'red' },
    },
    { function: 'strokeRectangle', rectangle: [170, 120, 100, 100] },
    { function: 'export', to },
  ]);
});

test('renders a stroked rectangle with an overridden width', async () => {
  const to = path.join('renders', 'stroke-overridden-width.png');

  const painter = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([130, 80, 100, 100], { width: 12 })
    .strokeRectangle([170, 120, 100, 100])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    { function: 'setStrokeStyle', style: 'black' },
    { function: 'setLineWidth', width: 6 },
    {
      function: 'strokeRectangle',
      rectangle: [130, 80, 100, 100],
      style: { width: 12 },
    },
    { function: 'strokeRectangle', rectangle: [170, 120, 100, 100] },
    { function: 'export', to },
  ]);
});

test('renders an image', async () => {
  const image = loadImage(fox);
  const to = path.join('renders', 'image.png');

  const painter = await new CanvasBuilder({ debug: true })
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .drawImage(image, [25, 25])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    {
      function: 'drawImage',
      at: [25, 25],
      image: fox,
    },
    { function: 'export', to },
  ]);
});

test('renders a subrectangle of an image', async () => {
  const image = loadImage(fox);
  const to = path.join('renders', 'image-subrectangle.png');

  const painter = await new CanvasBuilder({ debug: true })
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .drawImage(image, [150, 85], [150, 30, 100, 130])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    {
      function: 'drawImage',
      at: [150, 85],
      image: fox,
      source: [150, 30, 100, 130],
    },
    { function: 'export', to },
  ]);
});

test('renders filled text', async () => {
  const to = path.join('renders', 'fill-text.png');

  const painter = await new CanvasBuilder()
    .registerFont(rainbow, { family: 'Rainbow' })
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setFontFamily('Rainbow')
    .setFontSize(65)
    .fillText("Don't Panic", [25, 170])
    .export(to);

  expect(painter.events).toEqual([
    { function: 'registerFont', path: rainbow, style: { family: 'Rainbow' } },
    { function: 'setSize', height, width },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, width, height],
      style: 'white',
    },
    { function: 'setFontFamily', family: 'Rainbow' },
    { function: 'setFontSize', size: 65 },
    { function: 'fillText', at: [25, 170], text: "Don't Panic" },
    { function: 'export', to },
  ]);
});
