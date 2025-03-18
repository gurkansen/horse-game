<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<template>
  <h4 v-if="props.title" class="card-title">{{ props.title }}</h4>
</template>

<style>
.card-title {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  padding: 8px 0;
  color: #333;
}
</style>
