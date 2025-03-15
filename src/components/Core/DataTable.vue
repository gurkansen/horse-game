<script setup lang="ts">
const props = defineProps<{
  heading: string[],
  items: { number: number, name: string }[],
}>();
</script>

<template>
  <div class="data-table">
    <div v-if="props.heading" class="table-heading">
      <span v-for="text, i in props.heading" :key="i">
        {{ text }}
      </span>
    </div>
    <div class="table-body">
      <div v-for="item, i in props.items" :key="'item-' + i" class="table-item">
        <span>{{ item.number }}</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.data-table {
  
}

.table-heading {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
  margin-bottom: 8px;
  font-size: 12px;
  padding: 2px;
  color: #666;
}

.table-item {
  display: flex;
  justify-content: space-between;
  margin: 0;
  border-bottom: 1px solid #f0f0f0;
  padding: 2px;
}

.table-item span:last-child {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-item span {
  font-size: 11px;
}

.table-item:nth-child(1) span {
  font-size: 14px;
}

.table-item:nth-child(2) span {
  font-size: 13px;
}

.table-item:nth-child(3) span {
  font-size: 12px;
}

.table-item:last-child {
  border-bottom: 0;
}
</style>
