<template>
  <div
    ref="chartContainer"
    style="width: 100%; height: 100%;"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import { data, markLineData, markAreaData } from './data'


const chartContainer = ref(null)
let myChart = null

onMounted(() => {
  myChart = echarts.init(chartContainer.value)
  const option = {
    series: [
      {
        type: 'line',
        smooth: true,
        symbolSize: 10,
        data: data,
        markLine: {
          itemStyle: {
            color: 'rgb(255, 175, 175)'
          },
          data: markLineData
        },
        markArea: {
          itemStyle: {
            color: 'rgba(255, 175, 175, 0.5)'
          },
          data: markAreaData
        },
      },
    ],
    xAxis: {
      min: data[0][0] - 1,
      type: 'value',
      axisLine: { onZero: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { onZero: false }
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none',
        endValue: 100
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'none'
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none'
      },
    ],
    tooltip: {
    },
  }
  myChart.setOption(option)

  const resizeObserver = new ResizeObserver(() => {
    if (myChart) {
      myChart.resize()
    }
  })

  resizeObserver.observe(chartContainer.value)

  onUnmounted(() => {
    resizeObserver.disconnect()
    if (myChart) {
      myChart.dispose()
      myChart = null
    }
  })
})
</script>

<style scoped></style>
