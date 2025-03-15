<script setup lang="ts">
import NavBar from "@/components/Layouts/Navbar.vue";
import HorseRace from "@/components/HorseRace.vue";
import RaceProgram from "@/components/RaceProgram.vue";
import HorseList from "@/components/HorseList.vue";
</script>

<template>
  <div class="home">
    <NavBar title="Horse Racing" />
    <div class="scrollable-results">
      <div class="results">
        <!-- <div v-for="resultList, i in duplicated" :key="i" class="result">
          1ST LAP - 1200m
          <div v-for="result in results" :key="'result-' + result.order" class="result-item">
            <span>{{ result.order }}</span>
            <span>{{ result.name }}</span>
          </div>
        </div> -->
      </div>
    </div>
    <div class="main-layout">
      <div class="lefbar">
        <HorseList />
      </div>
      <HorseRace />
      <div class="rightbar">
        <RaceProgram />
      </div>
    </div>
  </div>
</template>

<style>
.home {
  background-color: #f0f0f0;
  min-height: 100vh;
}

.main-layout {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
}

.scrollable-results {
  overflow-x: auto;
  display: flex;
}
</style>
