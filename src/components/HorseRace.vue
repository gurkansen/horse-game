<script setup lang="ts">
import { horses } from "@/data/horses";
import type { Horse } from "@/types";
import { laps } from "@/data/laps";
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import MainCard from "@/components/Core/MainCard.vue";

const store = useStore()

// const results = ref(Array(6))
// const horseTiming = ref(Array(10).fill(0))
// const horsePositions = ref(Array(10).fill(0))

const isProgramCreated = ref(false);
const isRaceStarted = ref(false);

const activeLap = ref(0);

const program = computed(() => store.state.program)

const generateProgram = () => {
  store.dispatch('loadLaps', laps)
  store.dispatch('generateProgram', horses)
  isProgramCreated.value = true;
  setNextRace(activeLap.value);
}

const setNextRace = (lapIndex: number) => {
  activeHorses.value = program.value[lapIndex].horses
  // store.commit('SET_POSITIONS', lapIndex)
  // store.commit('SET_POSITIONS', 2)
}

const raceStarted = ref(false);
const racePaused = ref(false);
const winners = ref<string[]>([]);
const raceDistance = 1200;
const activeHorses = ref<Horse[]>([]);
let raceInterval: number | null = null;

const startRace = () => {
  if (raceStarted.value) return;
  raceStarted.value = true;
  racePaused.value = false;
  winners.value = [];

  activeHorses.value.forEach((horse: Horse) => {
    horse.speed = (horse.condition / 100) * 10 + Math.random() * 2; // think
  });

  runRace();
}

const runRace = () => {
  raceInterval = setInterval(() => {
    activeHorses.value.forEach((horse: Horse) => {
      if (horse.left < raceDistance) {
        horse.left += horse.speed;
      } else if (!winners.value.includes(horse.name)) {
        winners.value.push(horse);
      }
    });

    if (winners.value.length === 10) {
      clearInterval(raceInterval!);
      raceStarted.value = false;
    }
  }, 50);
}

const togglePause = () => {
  if (racePaused.value) {
    racePaused.value = false;
    runRace();
  } else {
    racePaused.value = true;
    clearInterval(raceInterval!);
  }
};

const restartRace = () => {
  clearInterval(raceInterval!);
  raceStarted.value = false;
  racePaused.value = false;
  winners.value = [];
  activeHorses.value = program.value[0]
  console.log(program.value[0])
  console.log(activeHorses)
};

</script>

<template>
  <div class="hipodrom">
    <MainCard>
      <div class="hipodrom-bar">
        <button v-if="!program.length" class="hipodrom-button generate" @click="generateProgram()">Generate Program</button>
        <button class="hipodrom-button start" @click="startRace()">
          Start
        </button>
        <button v-if="program.length" :disabled="!raceStarted" class="hipodrom-button start" @click="togglePause()">
          {{ racePaused ? "Resume" : "Pause" }}
        </button>
        <button v-if="raceStarted" class="hipodrom-button restart" @click="restartRace()">Restart</button>
      </div>
      <div class="field" ref="field">
        <div class="border" :class="raceStarted && !racePaused ? 'border-move' : ''"></div>
        <div v-for="horse, i in activeHorses" :key="i" class="line">
          <span class="horse-name">{{ horse.name }}</span>
          <img tabindex="1" src="http://cliparts.co/cliparts/8Tz/Byj/8TzByjyTp.gif" alt="Running Horse" :style="{ left: horse.left + 'px' }">
          <div class="border" :class="raceStarted && !racePaused ? 'border-move' : ''"></div>
        </div>
      </div>
    </MainCard>
  </div>
</template>

<style>

.hipodrom-bar {
  background-color: #ddd;
  height: 32px;
  padding: 16px;
}

.hipodrom-button {
  background-color: #333;
  color: white;
  border: 0;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 4px;
  cursor: pointer;
}

.line {
  width: 100%;
  height: 50px;
  background-color: #50e462;
  /* border-bottom: 3px dashed #333; */
  position: relative;
}

.line .border {
  position: absolute;
  bottom: 0px;
}

.line:nth-child(2n) {
  background-color: #2eac3d;
}

.line img {
  position: absolute;
  height: 50px;
  left: 0px;
  top: 0px;
}

.line .horse-name {
  margin-left: 120px;
  font-size: 18px;
  font-weight: 500;
  line-height: 50px;
  color: rgba(255,255,255,0.3);
  transition: ease-out 0.3s;
}

.line .horse-number {
  position: absolute;
  z-index: 1;
  color: #fff;
  background-color: red;
  font-size: 12px;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  left: 55px;
  top: 5px;
}
</style>
