import { Image } from 'canvas';

import IFont from '../interfaces/font';
import IStroke from '../interfaces/stroke';

export interface Event {
  function: string;
}

export interface ClearEvent extends Event {
  function: 'clear';
  style: string | CanvasGradient | CanvasPattern;
}

export interface DrawImageEvent extends Event {
  function: 'drawImage';
  image: Image;
  at: [number, number];
  source: [number, number, number, number] | undefined;
}
export interface ExportEvent extends Event {
  function: 'export';
  to: string;
}

export interface FillRectangleEvent extends Event {
  function: 'fillRectangle';
  rectangle: [number, number, number, number];
  style: string | CanvasGradient | CanvasPattern | undefined;
}

export interface FillTextEvent extends Event {
  function: 'fillText';
  text: string;
  at: [number, number];
}

export interface RegisterFontEvent extends Event {
  function: 'registerFont';
  localPath: string;
  style: IFont;
}

export interface SetFillStyleEvent extends Event {
  function: 'setFillStyle';
  style: string | CanvasGradient | CanvasPattern;
}

export interface SetFontFamilyEvent extends Event {
  function: 'setFontFamily';
  family: string;
}

export interface SetFontSizeEvent extends Event {
  function: 'setFontSize';
  size: number;
}

export interface SetLineWidthEvent extends Event {
  function: 'setLineWidth';
  width: number;
}

export interface SetSizeEvent extends Event {
  function: 'setSize';
  height: number;
  width: number;
}

export interface SetStrokeStyleEvent extends Event {
  function: 'setStrokeStyle';
  style: string | CanvasGradient | CanvasPattern;
}

export interface StrokeRectangleEvent extends Event {
  function: 'strokeRectangle';
  rectangle: [number, number, number, number];
  style: IStroke | undefined;
}
