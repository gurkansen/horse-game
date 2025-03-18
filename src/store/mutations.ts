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
  }  
}

export default mutations