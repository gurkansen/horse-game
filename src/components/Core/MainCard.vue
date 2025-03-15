<script setup lang="ts">
const props = defineProps<{
  title: {
    type: string,
    required: false
  },
  menu: {
    type: string[],
    required: false
  }
}>();
</script>

<template>
  <div class="main-card">
    <p v-if="props.title">{{ props.title }}</p>
    <div v-if="menu" class="card-menu">
      <span v-for="text, i in menu" :key="i">
        {{ text }}
      </span>
    </div>
    <slot />
  </div>
</template>

<style>
.main-card {
  background-color: #fff;
  margin: 0 16px;
  margin-bottom: 32px;
  padding: 2px 12px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 200px
}

.main-card p {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  padding: 8px 0;
  color: #333;
}

.card-menu {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
  margin-bottom: 8px;
  font-size: 12px;
  padding: 2px;
  color: #666;
}
</style>
