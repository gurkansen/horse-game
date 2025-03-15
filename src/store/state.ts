import type { Horse } from './types'

export interface State {
  programs: Horse[][];
  results: Horse[][];
  lapCount: number;
}

const state: State = {
  programs: [],
  results: [],
  lapCount: 6
}

export default state;