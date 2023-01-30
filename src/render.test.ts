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
