<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import MainCard from "@/components/Core/MainCard.vue";
import DataTable from "@/components/Core/DataTable.vue";

const store = useStore()

const program = computed(() => store.state.program)
</script>

<template>
  <div class="program">
    <MainCard v-for="item, i in program" :key="i" :title="`LAP: ${i+1} - ${item.lap.distance}${item.lap.distanceUnit}`">
      <DataTable :heading="['Position', 'Name']" :items="item.horses" />
    </MainCard>
  </div>
</template>

<style scoped>
.program {
  /* height: 80vh; */
  /* overflow-y: auto; */
  /* overflow-y: auto; */
  /* height: 80%; */
  /* display: flex; */
}
</style>
