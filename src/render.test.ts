import path from 'path';

import CanvasBuilder from '.';

// These tests intentionally render to the local filesystem and have no
// assertions. The intention is for developers to be alerted to a broken test
// by noticing a rendered image has changed from the version in Git.

test('renders an empty canvas', () => {
  new CanvasBuilder()
    .initialize(400, 300)
    .export(path.join('renders', 'empty.png'));
});

test('renders a cleared canvas', () => {
  new CanvasBuilder()
    .initialize(400, 300)
    .clear('white')
    .export(path.join('renders', 'clear.png'));
});

test('renders a filled rectangle with the default style', () => {
  new CanvasBuilder()
    .initialize(400, 300)
    .clear('white')
    .setFillStyle('black')
    .fillRectangle([150, 100, 100, 100])
    .export(path.join('renders', 'fill-default.png'));
});

test('renders a filled rectangle with an overridden style', () => {
  new CanvasBuilder()
    .initialize(400, 300)
    .clear('white')
    .setFillStyle('black')
    .fillRectangle([150, 100, 100, 100], 'red')
    .fillRectangle([175, 125, 50, 50])
    .export(path.join('renders', 'fill-overridden.png'));
});

test('renders a stroked rectangle with the default style', () => {
  new CanvasBuilder()
    .initialize(400, 300)
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([150, 100, 100, 100])
    .export(path.join('renders', 'stroke-default.png'));
});

test('renders a stroked rectangle with an overridden style', () => {
  new CanvasBuilder()
    .initialize(400, 300)
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([130, 80, 100, 100], { style: 'red' })
    .strokeRectangle([170, 120, 100, 100])
    .export(path.join('renders', 'stroke-overridden-style.png'));
});

test('renders a stroked rectangle with an overridden width', () => {
  new CanvasBuilder()
    .initialize(400, 300)
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([130, 80, 100, 100], { width: 12 })
    .strokeRectangle([170, 120, 100, 100])
    .export(path.join('renders', 'stroke-overridden-width.png'));
});
