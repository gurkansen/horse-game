<script setup lang="ts">
import { horses } from "@/data/horses";
import type { Horse } from "@/types";
import { laps } from "@/data/laps";
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import MainCard from "@/components/Core/MainCard.vue";
import Button from "@/components/Core/Buttons/Button.vue";

const store = useStore()

const isProgramCreated = ref(false);

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
}

const raceStarted = ref(false);
const racePaused = ref(false);
const winners = ref<string[]>([]);
const raceDistance = ref(0);
const horseWidth = 65
const finishLineBuffer = 40

onMounted(() => {
  const field = document.querySelector('.field');
  if (field) {
    raceDistance.value = field.clientWidth - (horseWidth + finishLineBuffer);
  }
});
const activeHorses = ref<Horse[]>([]);
let raceInterval: number | null = null;

const startRace = () => {
  if (raceStarted.value) return;
  raceStarted.value = true;
  racePaused.value = false;
  winners.value = [];

  activeHorses.value.forEach((horse: Horse) => {
    horse.left = 0;
    horse.speed = (horse.condition / 100) * 5 + Math.random() * 10;
  });

  runRace();
}

const runRace = () => {
  raceInterval = setInterval(() => {
    activeHorses.value.forEach((horse: Horse) => {
      if (horse.left < raceDistance.value) {
        horse.left += horse.speed;
      } else if (!winners.value.some(winner => winner.name === horse.name)) {
        horse.finishPosition = winners.value.length + 1;
        winners.value.push(horse);
      }
    });
    if (winners.value.length === 10) {
      clearInterval(raceInterval!);
      raceStarted.value = false;
      store.commit('SET_RESULT', program.value[activeLap.value]);
      activeLap.value += 1;
      if (activeLap.value < program.value.length) {
        setNextRace(activeLap.value);
      }
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

</script>

<template>
  <div class="hipodrom">
    <MainCard>
      <div class="hipodrom-bar">
        <Button v-if="!program.length" text="Generate Program" @click="generateProgram()" />
        <Button v-if="isProgramCreated" :disabled="raceStarted" :text="`▶ Start Lap ${activeLap + 1}`" @click="startRace()" />
        <Button v-if="isProgramCreated" :disabled="!raceStarted" :text="racePaused ? '▶ Resume' : '▫️ Pause'" @click="togglePause()" />
      </div>
      <div class="field" ref="field">
        <div v-if="isProgramCreated" class="border" :class="raceStarted && !racePaused ? 'border-move' : ''"></div>
        <div v-for="horse, i in activeHorses" :key="i" class="line">
          <span class="field-text">{{ horse.name }}</span>
          <img tabindex="1" src="http://cliparts.co/cliparts/8Tz/Byj/8TzByjyTp.gif" alt="Running Horse" :style="{ left: horse.left + 'px' }">
          <div class="border" :class="raceStarted && !racePaused ? 'border-move' : ''"></div>
        </div>
        <div v-if="isProgramCreated" class="field-bottom">
          <span class="field-text">
            {{ 'LAP: ' + (activeLap + 1) + ' - ' + program[activeLap].lap.distance + program[activeLap].lap.distanceUnit }}
          </span>
        </div>
        <div v-if="isProgramCreated" class="start-line"></div>
        <div v-if="isProgramCreated" class="finish-line">
          <div class="line-square" v-for="i in 100" :key="'s-' + i" />
        </div>
      </div>
    </MainCard>
  </div>
</template>

<style>

.hipodrom-bar {
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
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

.field {
  position: relative;
}

.start-line {
  width: 3px;
  height: 100%;
  background-color: brown;
  position: absolute;
  left: 10px;
  transform: translateX(50%);
  top: 0;
}

.finish-line {
  width: 24px;
  height: calc(100% - 65px);
  background-color: brown;
  position: absolute;
  transform: translateX(50%);
  right: 40px;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

.line-square {
  width: 12px;
  height: 12px;
  background-color: #fff;
}

.line-square:nth-child(4n - 3), .line-square:nth-child(4n) {
  background-color: #333;
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
  width: 65px;
  left: 0px;
  top: 0px;
  z-index: 1;
}

.field-text {
  margin-left: 120px;
  font-size: 18px;
  font-weight: 500;
  line-height: 50px;
  color: rgba(255,255,255,0.3);
  transition: ease-out 0.3s;
}

.field-bottom {
  background-color: #2eac3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.field-bottom .field-text {
  color: #fff;
  font-size: 24px;
  line-height: 64px;
  margin: 0;
}
</style>
