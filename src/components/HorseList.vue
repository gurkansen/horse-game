<script setup lang="ts">
import { horses } from "@/data/Horses";
import MainCard from "@/components/Core/MainCard.vue";
import CardItem from "@/components/Core/CardItem.vue";

</script>

<template>
  <div class="program">
    <MainCard title="Horse List" :menu="['Name', 'Condition']">
      <CardItem
        v-for="(horse, i) in horses"
        :key="'horse-' + i"
        :name="horse.name"
        :condition="horse.condition"
        :color="horse.color"
      />
    </MainCard>
  </div>
</template>
