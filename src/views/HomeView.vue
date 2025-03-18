<script setup lang="ts">
import NavBar from "@/components/Layouts/Navbar.vue";
import HorseRace from "@/components/HorseRace.vue";
import RaceProgram from "@/components/RaceProgram.vue";
import HorseList from "@/components/HorseList.vue";
import RaceResults from "@/components/RaceResults.vue";
import CardTitle from "@/components/Core/Texts/CardTitle.vue";
</script>

<template>
  <div class="home">
    <NavBar title="Horse Racing" />
    <div class="wrapper">
      <HorseList />
      <!-- <div class="scrollable-results">
        
      </div> -->
      <div class="main-layout">
        <div class="scrollable leftbar">
          <CardTitle title="Race Program" class="sidebar-title" />
          <RaceProgram />
        </div>
        <div class="scrollable center">
          <CardTitle title="Race Area" class="sidebar-title" />
          <HorseRace />
        </div>
        <div class="scrollable rightbar">
          <CardTitle title="Results" class="sidebar-title" />
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
  height: 80%;
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

.sidebar-title {
  padding: 0;
  margin-left: 16px;
  font-size: 16px;  
}
</style>
