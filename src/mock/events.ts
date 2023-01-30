export interface Event {
  function: string;
}

export interface ClearEvent extends Event {
  style: string | CanvasGradient | CanvasPattern;
}

export interface ExportEvent extends Event {
  to: string;
}

export interface InitializeEvent extends Event {
  height: number;
  width: number;
}
