<script setup lang="ts">
const props = defineProps<{
  title: string
}>();
</script>

<template>
  <div class="navbar">
    {{ props.title}}
  </div>
</template>

<style>
.navbar {
  height: 48px;
  background-color: #333;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
