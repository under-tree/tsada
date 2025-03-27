<script setup>
import Chart from '../components/MultipleTimeSeriseChart.vue'
import { data } from '../components/data'

const multipleData = [
  data,
  data.map(point => [point[0], point[1] * 2]),
  data.map(point => [point[0], point[1] / 2]),
  data.map(point => [point[0], point[1] + 0.5]),
  data.map(point => [point[0], point[1] - 0.5])
]
</script>

<template>
  <div class="h-[80svh] w-4/5 p-8">
    <Chart :timeseries="multipleData" />
  </div>
</template>

<style scoped></style>
