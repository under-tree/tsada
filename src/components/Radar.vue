<script setup>
import RadarChart from './RadarChart.vue'

const title = '性能指标'
const legendData = ['ARIMA', 'TadGAN']
const radarIndicator = [
  { name: 'PA-F1', max: 1 },
  { name: 'Event-based-F1', max: 1 },
  { name: 'R-based-F1', max: 1 },
  { name: 'Affiliation-F1', max: 1 },
  { name: 'AUC-PR', max: 1 },
  { name: 'AUC-ROC', max: 1 }
]
const seriesData = [
  {
    value: [0.42, 0.30, 0.40, 0.35, 0.50, 0.18],
    name: 'ARIMA'
  },
  {
    value: [0.50, 0.64, 0.78, 0.66, 0.82, 0.51],
    name: 'TadGAN'
  }
]
</script>

<template>

  <RadarChart
    :title="title"
    :legendData="legendData"
    :radarIndicator="radarIndicator"
    :seriesData="seriesData"
  />

</template>

<style scoped></style>
