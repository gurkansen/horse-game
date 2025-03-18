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
  padding: 4px 2px;
}

.list-text:first-child span:first-child {
  background-color: gold;
}

.list-text:nth-child(2) span:first-child {
  background-color: brown;
  color: #fff;
}

.list-text:nth-child(3) span:first-child {
  background-color: silver;
}

.list-text span:first-child {
  background-color: #f0f0f0;
  padding: 2px 4px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin-right: 8px;
}

.list-text span:last-child {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}

.list-text span {
  font-size: 11px;
}

.list-text:nth-child(1) span {
  font-size: 18px;
  font-weight: 500;
}

.list-text:nth-child(2) span {
  font-size: 16px;
  font-weight: 500;
}

.list-text:nth-child(3) span {
  font-size: 14px;
  font-weight: 500;
}

.list-text:last-child {
  border-bottom: 0;
}
</style>
