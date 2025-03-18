<script setup lang="ts">
import NavBar from "@/components/Layouts/Navbar.vue";
import HorseRace from "@/components/HorseRace.vue";
import RaceProgram from "@/components/RaceProgram.vue";
import HorseList from "@/components/HorseList.vue";
import RaceResults from "@/components/RaceResults.vue";
</script>

<template>
  <div class="home">
    <NavBar title="Horse Racing" />
    <div class="wrapper">
      <!-- <HorseList /> -->
      <!-- <div class="scrollable-results">
        
      </div> -->
      <div class="main-layout">
        <div class="scrollable leftbar">
          <RaceProgram />
        </div>
        <div class="scrollable center">
          <HorseRace />
        </div>
        <div class="scrollable rightbar">
          <RaceResults />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.home {
  background-color: #f0f0f0;
  height: 100vh;
  overflow: hidden;
}

.wrapper {
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-layout {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  height: 80%;
  height: 100%;
}

.scrollable-results {
  overflow-y: auto;
}

.scrollable {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.center {
  width: 100%;
}

.rightbar, .leftbar {
  max-width: 260px;
}
</style>
