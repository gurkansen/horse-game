<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import MainCard from "@/components/Core/MainCard.vue";
// import DataTable from "@/components/Core/DataTable.vue";
import ListText from "@/components/Core/Texts/ListText.vue";

const store = useStore()

const results = computed(() => store.state.results)
// console.log(results.value[0].horses)
</script>

<template>
  <div class="scrollable-results">
    <div v-if="results.length" class="results">
      <MainCard v-for="result, i in results" :key="i" :title="`LAP: ${i+1} - ${result.lap.distance}${result.lap.distanceUnit}`">
        <div v-if="result.horses" class="card-content">
            <ListText v-for="horse, i in result.horses.slice().sort((a, b) => a.finishPosition - b.finishPosition)" :key="'horse-' + i">
              <span>{{ horse.finishPosition }}</span>
              <span>{{ horse.name }}</span>
            </ListText>
        </div>
      </MainCard>
    </div>
    <div v-else>
      <MainCard title="No Results Yet">
        <p>Click <b>Generate Program</b> and <b>Start a Race</b> to see the results.</p>
      </MainCard>
    </div>
  </div>
</template>