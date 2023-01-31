import path from 'path';

import { loadImage } from 'canvas';

import CanvasBuilder from '.';

// These tests intentionally render to the local filesystem and have no
// assertions. The intention is for developers to be alerted to a broken test
// by noticing a rendered image has changed from the version in Git.

const fox = path.join('test-data', 'pexels-erik-mclean-4157094.jpg');
const rainbow = path.join('test-data', 'Rainbow2000.ttf');

test('renders an empty canvas', () => {
  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .export(path.join('renders', 'empty.png'));
});

test('renders a cleared canvas', () => {
  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .export(path.join('renders', 'clear.png'));
});

test('renders a filled rectangle with the default style', () => {
  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .setFillStyle('black')
    .fillRectangle([150, 100, 100, 100])
    .export(path.join('renders', 'fill-default.png'));
});

test('renders a filled rectangle with an overridden style', () => {
  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .setFillStyle('black')
    .fillRectangle([150, 100, 100, 100], 'red')
    .fillRectangle([175, 125, 50, 50])
    .export(path.join('renders', 'fill-overridden.png'));
});

test('renders a stroked rectangle with the default style', () => {
  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([150, 100, 100, 100])
    .export(path.join('renders', 'stroke-default.png'));
});

test('renders a stroked rectangle with an overridden style', () => {
  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([130, 80, 100, 100], { style: 'red' })
    .strokeRectangle([170, 120, 100, 100])
    .export(path.join('renders', 'stroke-overridden-style.png'));
});

test('renders a stroked rectangle with an overridden width', () => {
  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([130, 80, 100, 100], { width: 12 })
    .strokeRectangle([170, 120, 100, 100])
    .export(path.join('renders', 'stroke-overridden-width.png'));
});

test('renders an image', async () => {
  const image = await loadImage(fox);

  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .drawImage(image, [25, 25])
    .export(path.join('renders', 'image.png'));
});

test('renders a subrectangle of an image', async () => {
  const image = await loadImage(fox);

  new CanvasBuilder()
    .setSize(400, 300)
    .build()
    .clear('white')
    .drawImage(image, [150, 85], [150, 30, 100, 130])
    .export(path.join('renders', 'image-subrectangle.png'));
});

test('renders filled text', () => {
  new CanvasBuilder()
    .registerFont(rainbow, { family: 'Rainbow' })
    .setSize(400, 300)
    .build()
    .clear('white')
    .setFontFamily('Rainbow')
    .setFontSize(65)
    .fillText("Don't Panic", [25, 170])
    .export(path.join('renders', 'fill-text.png'));
});
