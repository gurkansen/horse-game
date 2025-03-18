import type { Program, Result, Lap } from './types'

export interface State {
  program: Program[];
  results: Result[];
  laps: Lap[];
}

const state: State = {
  program: [],
  results: [],
  laps: []
}

export default state;