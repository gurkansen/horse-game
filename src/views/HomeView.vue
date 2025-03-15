<script setup lang="ts">
import { horses, Horse } from "@/data/horses";
import { ref } from 'vue';

const LAP_COUNT = 6;
const programs = ref<Horse[][]>([]);
const generateProgram = () => {
  programs.value = [];
  for (let lap = 0; lap < LAP_COUNT; lap++) {
    const selectedHorses: Horse[] = [];
    while (selectedHorses.length < 10) {
      const randomIndex = Math.floor(Math.random() * horses.length);
      const horse = horses[randomIndex];
      if (!selectedHorses.includes(horse)) {
        selectedHorses.push(horse);
      }
    }
    selectedHorses.sort((a, b) => a.name.localeCompare(b.name));
    programs.value.push([...selectedHorses]);
  }
  console.log(programs);
};

const results = [
  { order: 1, name: 'Ada Lovelace Lovelace' },
  { order: 2, name: 'Grace Hopper' },
  { order: 3, name: 'Marie Curie' },
  { order: 4, name: 'Carl Sagan' },
  { order: 5, name: 'Nikola Tesla' },
  { order: 6, name: 'Ada Lovelace' },
  { order: 7, name: 'Grace Hopper' },
  { order: 8, name: 'Marie Curie' },
  { order: 9, name: 'Carl Sagan' },
  { order: 10, name: 'Nikola Tesla' },
]

const duplicated = Array.from({ length: 6 }, () => [...results]);

const horsePositions = ref(Array(11).fill(0));

let raceInterval: number;

const isRaceStarted = ref(false);

const startRace = () => {
  if (isRaceStarted.value) {
    isRaceStarted.value = false;
    clearTimeout(raceInterval);
    return;
  }
  isRaceStarted.value = true;
  animateHorses();
  
};

const animateHorses = () => {
  horsePositions.value = horsePositions.value.map(pos => pos + Math.random() * 10);
  if (horsePositions.value.every(pos => pos < 985)) {
    raceInterval = setTimeout(animateHorses, 50);
  }
};

const restartRace = () => {
  clearTimeout(raceInterval);
  horsePositions.value = Array(11).fill(0);
  startRace();
};

</script>

<template>
  <div class="home">
    <div class="navbar">
      Horse Racing
    </div>
    <div class="scrollable-results">
      <div class="results">
        <div v-for="resultList, i in duplicated" :key="i" class="result">
          1ST LAP - 1200m
          <div v-for="result in results" :key="'result-' + result.order" class="result-item">
            <span>{{ result.order }}</span>
            <span>{{ result.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="lefbar">
        <div class="program">
          <div class="result">
            Horse List (1-20)
            <div v-for="horse in horses" :key="horse.name" class="result-item">
              <span>{{ horse.condition }}</span>
              <span>{{ horse.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hipodrom">
        <div class="hipodrom-bar">
          <button class="hipodrom-button generate" @click="generateProgram()">Generate Program</button>
          <button class="hipodrom-button start" @click="startRace()">
            {{ isRaceStarted ? 'Stop' : 'Start' }}
          </button>
          <button class="hipodrom-button restart" @click="restartRace()">Restart</button>
        </div>  
        <div v-for="i in 10" :key="i" class="line">
          <img tabindex="1" src="http://cliparts.co/cliparts/8Tz/Byj/8TzByjyTp.gif" alt="Running Horse" :style="{ left: horsePositions[i] + 'px' }">
          <!-- <span class="horse-number">{{ i }}</span> -->
        </div>
      </div>
      <div class="rightbar">
        <div class="program">
          <div v-for="program, i in programs" :key="i" class="result">
             LAP: {{ i }} - 1200m
            <div v-for="horse in program" :key="'result-' + horse.id" class="result-item">
              <span>{{ horse.id }}</span>
              <span>{{ horse.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.home {
  background-color: #f0f0f0;
  min-height: 100vh;
}

.navbar {
  height: 48px;
  background-color: #333;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  justify-content: space-between;
  padding: 8px;
}

.hipodrom {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 12px 12px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  border-bottom: 3px dashed #333;
  position: relative;
}

.line:nth-child(2n) {
  background-color: #2eac3d;
}

.line img {
  position: absolute;
  height: 80px;
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

.scrollable-results {
  overflow-x: auto;
  display: flex;
}

.results {
  display: flex;
  align-items: center;
  margin: 16px 8px;
}

.result {
  background-color: #fff;
  margin: 0 8px;
  padding: 2px 12px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 150px
}

.result-item {
  display: flex;
  justify-content: space-between;
  margin: 0;
  border-bottom: 1px solid #f0f0f0;
  padding: 2px;
}

.result-item span:last-child {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-item span {
  font-size: 11px;
}

.result-item:nth-child(1) span {
  font-size: 14px;
}

.result-item:nth-child(2) span {
  font-size: 13px;
}

.result-item:nth-child(3) span {
  font-size: 12px;
}

.result-item:last-child {
  border-bottom: 0;
}
</style>
