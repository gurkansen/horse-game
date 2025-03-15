<script setup lang="ts">
const props = defineProps<{
  name: string,
  condition: number,
  color: string
}>();
</script>

<template>
  <div class="card-item" :style="`border-color: ${props.color}`">
    <span>{{ props.name }}</span>
    <span>{{ props.condition }}</span>
  </div>
</template>

<style>
.card-item {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  border-radius: 4px;
  color: #333;
  border-left: 4px solid transparent;
  padding: 4px;
  font-weight: 500;
  padding-left: 8px;
  background-color: rgba(0,0,0,0.03);
}
</style>
