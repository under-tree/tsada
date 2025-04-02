<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  timeseries: {
    type: Array,
    required: true,
    validator: (value) => value.length > 0 && Array.isArray(value[0])
  }
})

const chartContainer = ref(null)
let myChart = null
let resizeObserver = null

const createChartOption = (timeseries) => {
  return {
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '15%',
    },
    series: [{
      type: 'line',
      smooth: true,
      symbolSize: 5,
      data: timeseries,
    }],
    xAxis: {
      min: timeseries.length > 0 ? timeseries[0][0] - 1 : 0,
      type: 'value',
      axisLine: { onZero: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { onZero: false }
    },
    dataZoom: [
      { type: 'slider', xAxisIndex: 0, filterMode: 'none', startValue: 0, endValue: 100 },
      { type: 'slider', yAxisIndex: 0, filterMode: 'none', width: 10 },
      { type: 'inside', xAxisIndex: 0, filterMode: 'none' }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const [point] = params
        return `(${point.data[0]}, ${point.data[1]})`
      }
    }
  }
}

const initChart = () => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    myChart.setOption(createChartOption(props.timeseries))
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

watch(() => props.timeseries, (newVal) => {
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
