<template>
  <div class="list-text">
    <slot />
  </div>
</template>

<style>
.list-text {
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
  text-align: right;
}

.table-item span {
  font-size: 11px;
}

/* .table-item:nth-child(1) span {
  font-size: 14px;
}

.table-item:nth-child(2) span {
  font-size: 13px;
}

.table-item:nth-child(3) span {
  font-size: 12px;
} */

.table-item:last-child {
  border-bottom: 0;
}
</style>
