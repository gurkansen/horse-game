import type { State } from './state'
import type { Program, Lap, Result, Horse } from './types'

const mutations = {
  SET_LAPS(state: State, laps: Lap[]) {
    state.laps = laps;
  },
  SET_PROGRAM(state: State, program: Program[]) {
    state.program = program;
  },
  SET_RESULT(state: State, result: Result) {
    state.results.push(result);
  },
  SET_POSITIONS(state: State, lapIndex: number) {
    state.program[lapIndex].horses = state.program[lapIndex].horses.map((horse: Horse, index: number) => ({
      ...horse,
      position: index + 1
    }));
  
    console.log(state.program[lapIndex].horses);
  },
  SET_RACE_STARTED(state: State, isStarted: boolean) {
    const lapIndex = state.results.length ? state.results.length - 1 : 0;
    state.results[lapIndex].isRaceStarted = isStarted;
  }
}

export default mutations