<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: String,
  legendData: Array,
  radarIndicator: Array,
  seriesData: Array,
})

const chartContainer = ref(null)
let myChart = null
let resizeObserver = null

const createChartOption = (data) => {
  return {
    // title: {
    //   text: props.title
    // },
    legend: {
      data: props.legendData
    },
    radar: {
      indicator: props.radarIndicator
    },
    series: [
      {
        name: props.legendData.join(' | '),
        type: 'radar',
        data: props.seriesData
      }
    ],
  }
}

const initChart = () => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    myChart.setOption(createChartOption(props.data))
  }
}

const handleResize = () => {
  if (myChart) {
    myChart.resize()
  }
}

const disposeChart = () => {
  if (myChart) {
    myChart.dispose()
    myChart = null
  }
}

watch(() => props.seriesData, (newVal) => {
  if (myChart) {
    myChart.setOption(createChartOption(newVal))
  }
}, { deep: true })

onMounted(() => {
  nextTick(() => {
    initChart()
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(chartContainer.value)
  })
})

onUnmounted(() => {
  disposeChart()
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    class="w-full h-full"
    ref="chartContainer"
  ></div>
</template>

<style scoped></style>
