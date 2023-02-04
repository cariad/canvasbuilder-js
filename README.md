# canvasbuilder

**canvasbuilder** wraps the [canvas](https://www.npmjs.com/package/canvas) Node.js package to help build, paint and unit-test canvases.

## Installation

```console
npm install canvasbuilder
```

## Example

This example creates a 400x300 canvas, clears it to a white background, draws some text, then exports the canvas to a PNG file:

```javascript
import { CanvasBuilder } from 'canvasbuilder';

const builder = await new CanvasBuilder()
  .setSize(400, 300)
  .beginPainting()
  .clear('white')
  .setFontSize(60)
  .fillText("Don't Panic", [25, 170])
  .export('readme-text.png');
```

![Don't Panic](https://media.githubusercontent.com/media/cariad/canvasbuilder-js/main/renders/readme-text.png)

To unit-test that code, interrogate the `.events` property:

```javascript
expect(builder.events).toEqual([
  {
    function: 'setSize',
    height: 400,
    width: 300,
  },
  {
    function: 'fillRectangle',
    rectangle: [0, 0, 400, 300],
    style: 'white',
  },
  {
    function: 'setFontSize',
    size: 60,
  },
  {
    function: 'fillText',
    at: [25, 170],
    text: "Don't Panic",
  },
  {
    function: 'export',
    to: 'readme-text.png',
  },
]);
```

## Usage

A canvas must be prepared before it can be painted on.

To prepare a canvas, create a new `CanvasBuilder` then optionally call:

- `registerFont(localPath, style)` registers a font to use later. The style describes the font's CSS properties, which must describe the font's `family` and can optionally include a `style` and `weight`.

  ```javascript
  const builder = new CanvasBuilder()
    // Register 'Rainbow2000.ttf' as 'Rainbow'
    .registerFont('Rainbow2000.ttf', { family: 'Rainbow' });
  ```

- `setSize(width, height)` sets the width and height of the canvas.

  ```javascript
  const builder = new CanvasBuilder().setSize(1024, 768);
  ```

To begin painting on the canvas, call `beginPainting()`.

```javascript
const builder = new CanvasBuilder()
  .registerFont('Rainbow2000.ttf', { family: 'Rainbow' })
  .setSize(1024, 768)
  .beginPainting();
```

To paint on a prepared canvas call:

- `clear(style)` clears the canvas.
- `drawImage(image, at)` draws an image at the given coordinates.

  ```javascript
  import { loadImage } from 'canvas';

  const image = loadImage('foo.jpg');

  const builder = new CanvasBuilder().beginPainting().drawImage(image, [0, 0]);
  ```

- `drawImage(image, at, source)` draws a subrectangle of an image at the given coordinates. The `source` is an array describing the subrectangle's _x_, _y_, width and height.

  ```javascript
  import { loadImage } from 'canvas';

  const image = loadImage('foo.jpg');

  const builder = new CanvasBuilder()
    .beginPainting()
    .drawImage(image, [0, 0], [3, 7, 22, 14]);
  ```

- `export(to)` exports the canvas to a PNG file.
- `fillRectangle(rect)` fills a rectangle with the current fill style. The rectangle is an array describing _x_, _y_, width and height.
- `fillRectangle(rect, style)` fills a rectangle with a specific style. This does not replace the default fill style.

  ```javascript
  const builder = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setFillStyle('black')
    .fillRectangle([150, 100, 100, 100], 'red')
    .fillRectangle([175, 125, 50, 50])
    .export('fill-overridden.png');
  ```

![Red rectangle with inner black rectangle](https://media.githubusercontent.com/media/cariad/canvasbuilder-js/main/renders/fill-overridden.png)

- `fillText(text, at)` draws text at the given coordinates.
- `setFillStyle(style)` sets a new default fill style.
- `setFontFamily(family)` sets a new default font family.
- `setFontSize(family)` sets a new default font size.
- `setLineWidth(width)` sets a new default stroke line width.
- `setStrokeStyle(width)` sets a new default stroke style.
- `strokeRectangle(rect)` outlines a rectangle with the current stroke style. The rectangle is an array describing _x_, _y_, width and height.
- `strokeRectangle(rect, style)` outlines a rectangle with a specific style. This does not replace the default stroke style.

  ```javascript
  const builder = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setStrokeStyle('black')
    .setLineWidth(6)
    .strokeRectangle([130, 80, 100, 100], { style: 'red' })
    .strokeRectangle([170, 120, 100, 100])
    .export('stroke-overridden-style.png');
  ```

![Red rectangle with overlapping black rectangle](https://media.githubusercontent.com/media/cariad/canvasbuilder-js/main/renders/stroke-overridden-style.png)

## Contributions

Raise bug reports, request features and ask questions at [github.com/cariad/canvasbuilder-js/issues](https://github.com/cariad/canvasbuilder-js/issues).

## The Author

Hello! 👋 I'm Cariad Eccleston, and I'm a indie + freelance software engineer down by the beach in Devon, UK.

You can find my open source projects at [github.com/cariad](https://github.com/cariad), my resume at [linkedin.com/in/cariad](https://linkedin.com/in/cariad) and Mastodon microblog at [@cariad@tech.lgbt](https://tech.lgbt/@cariad).
