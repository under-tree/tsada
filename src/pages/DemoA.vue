<script setup>
import Chart from '../components/SingleTimeSeriseChart.vue'
import { data } from '../components/data'
</script>

<template>
  <div class="h-[80svh] w-4/5 p-8">
    <Chart :timeseries="data" />
  </div>
</template>

<style scoped></style>
