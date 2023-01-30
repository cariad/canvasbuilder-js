export interface Event {
  function: string;
}

export interface ExportEvent extends Event {
  to: string;
}

export interface InitializeEvent extends Event {
  height: number;
  width: number;
}
