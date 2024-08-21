<!-- components/Toast.vue -->
<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  message: String,
  status: {
    type: String,
    default: 'success', // 'success', 'error', 'warning', 'info'
  },
});

const alertClass = computed(() => `alert alert-${props.status}`);
</script>

<template>
  <div class="toast z-50 fixed top-4 right-4">
    <div :class="alertClass">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped>
.toast {
  transition: opacity 0.5s ease-in-out;
}
</style>
