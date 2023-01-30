import { IStroke } from '../interfaces';

export interface Event {
  function: string;
}

export interface ClearEvent extends Event {
  function: 'clear';
  style: string | CanvasGradient | CanvasPattern;
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

export interface InitializeEvent extends Event {
  function: 'initialize';
  height: number;
  width: number;
}

export interface SetFillStyleEvent extends Event {
  function: 'setFillStyle';
  style: string | CanvasGradient | CanvasPattern;
}

export interface SetLineWidthEvent extends Event {
  function: 'setLineWidth';
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
