export type Horse = {
  position: number;
  name: string;
  condition: number;
  color: string;
  speed: number;
  left: number;
};

export type Lap = {
  distance: number;
  distanceUnit: string;
}

export type Program = {
  lap: Lap;
  horses: Horse[];
}

export type Result = {
  lap: Lap;
  horses: Horse[];
  isRaceStarted: boolean;
}