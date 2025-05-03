<script setup>
import { computed } from 'vue'
import RadarChart from './RadarChart.vue'

const props = defineProps({
  data: {
    type: Object,
  }
})

const title = '性能指标'
const legendData = computed(() => Object.keys(props.data))
const radarIndicator = [
  { name: 'PA-F1', max: 1 },
  { name: 'Event-based-F1', max: 1 },
  { name: 'R-based-F1', max: 1 },
  { name: 'Affiliation-F1', max: 1 },
  { name: 'AUC-PR', max: 1 },
  { name: 'AUC-ROC', max: 1 }
]
const seriesData = computed(() => Object.values(props.data).map((value, index) => {
  return {
    value: value,
    name: legendData[index]
  }
}))
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
