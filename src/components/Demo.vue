<script setup>
import Chart from './HelloECharts.vue'
import { ref } from 'vue'

const data = ref([
  { value: 300, name: 'A' },
  { value: 100, name: 'B' },
  { value: 400, name: 'C' },
  { value: 100, name: 'D' },
  { value: 500, name: 'E' }
])
</script>

<template>
  <div class="w-100 h-100">
    <Chart :data="data" />
  </div>
</template>

<style scoped></style>
