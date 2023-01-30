export interface Event {
  function: string;
}

export interface ClearEvent extends Event {
  style: string | CanvasGradient | CanvasPattern;
}

export interface ExportEvent extends Event {
  to: string;
}

export interface FillRectangleEvent extends Event {
  rectangle: [number, number, number, number];
  style: string | CanvasGradient | CanvasPattern | undefined;
}

export interface InitializeEvent extends Event {
  height: number;
  width: number;
}

export interface SetFillStyleEvent extends Event {
  style: string | CanvasGradient | CanvasPattern;
}
