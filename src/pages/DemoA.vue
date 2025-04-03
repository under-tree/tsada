<script setup>
import Chart from '../components/SingleTimeSeriseChart.vue'
import { data } from '../components/data'

const anomalies = [
  [20, 40],
  [60],
]
</script>

<template>
  <div class="h-[80svh] w-4/5 p-8">
    <Chart
      :timeseries="data"
      :anomalies="anomalies"
    />
  </div>
</template>

<style scoped></style>
