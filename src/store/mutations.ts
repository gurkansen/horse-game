import type { State } from './state'

const mutations = {
  SET_PROGRAMS(state: State, programs: State['programs']) {
    state.programs = programs;
  }
}

export default mutations