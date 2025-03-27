<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  timeseries: {
    type: Array,
    required: true,
    validator: (value) => value.length > 0 && Array.isArray(value[0]) && Array.isArray(value[0][0])
  }
})

const chartContainer = ref(null)
let myChart = null
let resizeObserver = null

const createChartOption = (timeseries) => {
  const gridCount = timeseries.length
  const grids = []
  const xAxes = []
  const yAxes = []
  const series = []

  timeseries.forEach((seriesData, index) => {
    grids.push({
      left: '0%',
      right: '0%',
      top: `${5 + index * (85 / gridCount)}%`,
      height: `${85 / gridCount}%`,
    })

    xAxes.push({
      type: 'value',
      gridIndex: index,
      axisLine: { onZero: false },
      min: seriesData.length > 0 ? seriesData[0][0] - 1 : 0,
    })

    yAxes.push({
      type: 'value',
      gridIndex: index,
      axisLine: { onZero: false },
    })

    series.push({
      type: 'line',
      smooth: true,
      symbolSize: 5,
      data: seriesData,
      xAxisIndex: index,
      yAxisIndex: index,
    })
  })

  return {
    grid: grids,
    xAxis: xAxes,
    yAxis: yAxes,
    series: series,
    dataZoom: [
      { type: 'slider', xAxisIndex: timeseries.map((_, i) => i), filterMode: 'none', startValue: 0, endValue: 100 },
      { type: 'inside', xAxisIndex: timeseries.map((_, i) => i), filterMode: 'none' }
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
