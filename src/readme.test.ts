import path from 'path';

import { CanvasBuilder } from '.';

test('renders some text', async () => {
  const to = path.join('renders', 'readme-text.png');

  const builder = await new CanvasBuilder()
    .setSize(400, 300)
    .beginPainting()
    .clear('white')
    .setFontSize(60)
    .fillText("Don't Panic", [25, 170])
    .export(to);

  expect(builder.events).toEqual([
    { function: 'setSize', height: 400, width: 300 },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, 400, 300],
      style: 'white',
    },
    { function: 'setFontSize', size: 60 },
    { function: 'fillText', at: [25, 170], text: "Don't Panic" },
    { function: 'export', to },
  ]);
});
