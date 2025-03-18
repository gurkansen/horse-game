<script setup lang="ts">
import { horses } from "@/data/Horses";
import MainCard from "@/components/Core/MainCard.vue";
import CardItem from "@/components/Core/CardItem.vue";

import { ref } from 'vue';

const horseCount = horses.length
const horseLimit = ref(4)
const toggleExpand = () => {
  horseLimit.value = horseLimit.value === horseCount ? 4 : horseCount
}

</script>

<template>
  <div class="horse-list">
    <MainCard title="Horse List">
      <div class="card-content">
        <CardItem
          v-for="(horse, i) in horses.slice(0, horseLimit)"
          :key="'horse-' + i"
          :name="horse.name"
          :condition="horse.condition"
          :color="horse.color"
          class="card-item"
        />
      </div>
      <div class="card-bottom">
        <button class="expand-button" @click="toggleExpand()">
          {{ horseLimit === horseCount ? '⬆' : '⬇' }}
        </button>
      </div>
    </MainCard>
  </div>
</template>

<style scoped>
.horse-list {
  /* margin: 0 16px; */
}
.card-content {
  display: flex;
  flex-wrap: wrap;
}

.card-item {
  width: calc(25% - 16px);
}

.card-bottom {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 8px 0;
}

.expand-button {
  border: 0;
  margin: 0;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  background-color: #fff;
  color: #333;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
  top: 0px;
}
</style>
