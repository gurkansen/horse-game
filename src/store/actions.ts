import type { State } from './state'
import type { Horse, Program } from './types'

const actions = {
  generateProgram({ commit, state }: { commit: Function, state: State }, horses: Horse[]) {
    const program: Program[] = [];
    state.laps.forEach((lap, lapIndex) => {
      const selectedHorses: Horse[] = [];
      while (selectedHorses.length < 10) {
        const randomIndex = Math.floor(Math.random() * horses.length);
        const horse = horses[randomIndex];
        if (!selectedHorses.includes(horse)) {
          selectedHorses.push(horse);
        }
      }
      program.push({ lap, horses: [...selectedHorses] });
      program[lapIndex].horses = program[lapIndex].horses.map((horse: Horse, index: number) => ({
        ...horse,
        position: index + 1
      }));
    });
    commit('SET_PROGRAM', program);
    commit('SET_RESULT', program[0]);
    commit('SET_RESULT', program[1]);
  },
  loadLaps({ commit }: { commit: Function }, laps: State['laps']) {
    commit('SET_LAPS', laps);
  }
}

export default actions;
