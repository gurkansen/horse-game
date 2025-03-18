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
    <span>📈 {{ props.condition }}</span>
  </div>
</template>

<style>
.card-item {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  margin: 4px 8px;
  border-radius: 4px;
  color: #333;
  border-left: 4px solid transparent;
  padding: 2px 8px;
  font-weight: 500;
  background-color: rgba(0,0,0,0.03);
  font-size: 12px;
}
</style>
