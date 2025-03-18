<template>
  <button :class="buttonClass" @click="handleClick">
    <text v-if="props.text">{{ props.text }}</text>
  </button>
  <!-- <button v-if="!program.length" class="hipodrom-button generate" @click="generateProgram()">Generate Program</button> -->
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'primary'
  }
});

const emit = defineEmits(['click']);

const buttonClass = computed(() => ({
  'btn': true,
  [`btn-${props.variant}`]: true,
  'disabled': props.disabled
}));

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn {
  padding: 12px 32px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.3s;
  line-height: 1;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
