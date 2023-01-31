import CanvasBuilder from './builder';
import ICanvasBuilder from './interfaces/builder';
import ICanvasPainter from './interfaces/painter';
import IFont from './interfaces/font';
import IStroke from './interfaces/stroke';
import MockCanvasBuilder from './mock/builder';

import {
  Event,
  ClearEvent,
  DrawImageEvent,
  ExportEvent,
  FillRectangleEvent,
  FillTextEvent,
  RegisterFontEvent,
  SetFillStyleEvent,
  SetFontFamilyEvent,
  SetFontSizeEvent,
  SetLineWidthEvent,
  SetSizeEvent,
  SetStrokeStyleEvent,
  StrokeRectangleEvent,
} from './mock/events';

export {
  CanvasBuilder,
  ClearEvent,
  DrawImageEvent,
  Event,
  ExportEvent,
  FillRectangleEvent,
  FillTextEvent,
  ICanvasBuilder,
  ICanvasPainter,
  IFont,
  IStroke,
  MockCanvasBuilder,
  RegisterFontEvent,
  SetFillStyleEvent,
  SetFontFamilyEvent,
  SetFontSizeEvent,
  SetLineWidthEvent,
  SetSizeEvent,
  SetStrokeStyleEvent,
  StrokeRectangleEvent,
};
