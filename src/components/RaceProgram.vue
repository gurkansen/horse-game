<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import MainCard from "@/components/Core/MainCard.vue";
import DataTable from "@/components/Core/DataTable.vue";

const store = useStore()

const program = computed(() => store.state.programs)
</script>

<template>
  <div class="program">
    <MainCard v-for="lap, i in program" :key="i" :title="`LAP: ${i+1} - 1200m`">
        <DataTable :heading="['Number', 'Name']" :items="lap" />
    </MainCard>
  </div>
</template>
