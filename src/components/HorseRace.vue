<script setup lang="ts">
import { horses, Horse } from "@/data/horses";
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import HorseRace from "@/components/HorseRace.vue";

const store = useStore()

const results = ref(Array(6))
const horseTiming = ref(Array(10).fill(0))
const horsePositions = ref(Array(10).fill(0))

const isProgramCreated = ref(false);
const isRaceStarted = ref(false);

const activeRound = ref(0);
const rounds = []

const programs = computed(() => store.state.programs)

const generateProgram = () => {
  store.dispatch('generateProgram', horses)
  rounds[activeRound.value] = programs.value[activeRound.value]
  isProgramCreated.value = true;
  activeHorses.value = programs.value[0]
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
  activeHorses.value = programs.value[0]
  console.log(programs.value[0])
  console.log(activeHorses)
};

</script>

<template>
  <div class="hipodrom">
    <div class="hipodrom-bar">
      <button v-if="!programs.length" class="hipodrom-button generate" @click="generateProgram()">Generate Program</button>
      <button class="hipodrom-button start" @click="startRace()">
        Start
      </button>
      <button v-if="programs.length" :disabled="!raceStarted" class="hipodrom-button start" @click="togglePause()">
        {{ racePaused ? "Resume" : "Pause" }}
      </button>
      <button v-if="raceStarted" class="hipodrom-button restart" @click="restartRace()">Restart</button>
    </div>
    <div class="field" ref="field">
      <div class="border" :class="raceStarted && !racePaused ? 'border-move' : ''"></div>
      <div v-for="horse, i in activeHorses" :key="i" class="line">
        {{ horse.name }}
        <img tabindex="1" src="http://cliparts.co/cliparts/8Tz/Byj/8TzByjyTp.gif" alt="Running Horse" :style="{ left: horse.left + 'px' }">
        <div class="border" :class="raceStarted && !racePaused ? 'border-move' : ''"></div>
      </div>
    </div>
  </div>
</template>

<style>

.hipodrom {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 12px 12px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 16px;
}

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
  height: 60px;
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
  /* height: 80px; */
  width: 100px;
  left: 0;
  top: -30px;
  /* background-color: red; */
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
