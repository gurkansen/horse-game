<script setup lang="ts">
import { horses } from "@/data/Horses";
import MainCard from "@/components/Core/MainCard.vue";
import CardItem from "@/components/Core/CardItem.vue";

</script>

<template>
  <div class="horse-list">
    <!-- :menu="['Name', 'Condition']" -->
    <MainCard title="Horse List">
      <div class="card-content">
        <CardItem
          v-for="(horse, i) in horses"
          :key="'horse-' + i"
          :name="horse.name"
          :condition="horse.condition"
          :color="horse.color"
          class="card-item"
        />
      </div>
    </MainCard>
  </div>
</template>

<style scoped>
.horse-list {
  margin: 0 16px;
}
.card-content {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 16px;
}

.card-item {
  width: calc(25% - 16px);
}
</style>
