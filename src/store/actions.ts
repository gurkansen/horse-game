import type { State } from './state'
import type { Horse } from './types'

const actions = {
  generateProgram({ commit, state }: { commit: Function, state: State }, horses: Horse[]) {
    const programs: Horse[][] = [];
    for (let lap = 0; lap < 6; lap++) {
      const selectedHorses: Horse[] = [];
      while (selectedHorses.length < 10) {
        const randomIndex = Math.floor(Math.random() * horses.length);
        const horse = horses[randomIndex];
        if (!selectedHorses.includes(horse)) {
          selectedHorses.push(horse);
        }
      }
      selectedHorses.sort((a, b) => a.name.localeCompare(b.name));
      programs.push([...selectedHorses]);
    }
    commit('SET_PROGRAMS', programs);
  }
}

export default actions;
