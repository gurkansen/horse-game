<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import MainCard from "@/components/Core/MainCard.vue";
import DataTable from "@/components/Core/DataTable.vue";

const store = useStore()

const results = computed(() => store.state.results)
</script>

<template>
  <div class="scrollable-results">
    <div class="results">
      <MainCard v-for="result, i in results" :key="i" :title="`LAP: ${i+1} - ${result.lap.distance}${result.lap.distanceUnit}`">
        <DataTable :heading="['Position', 'Name']" :items="result.horses" />
      </MainCard>
    </div>
  </div>
</template>

<style scoped>
.scrollable-results {
  /* overflow-x: auto; */
  /* display: flex; */
  /* height: 20vh; */
}
.results {
  /* display: flex;
  padding: 24px 16px; */
}
</style>