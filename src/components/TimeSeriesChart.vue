<template>
  <div
    ref="chartContainer"
    style="width: 100%; height: 100%;"
  ></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'


const data = [
  [0, 0.0288930497090785],
  [1, 0.4030400109335138],
  [2, -0.3665846621297786],
  [3, -0.3697103413119156],
  [4, -0.3864548379991166],
  [5, 0.4030400109335138],
  [6, -0.381953177045768],
  [7, -0.3526316611922266],
  [8, -0.3656054056384419],
  [9, -0.3590148904354906],
  [10, 0.4030400109335138],
  [11, -0.3867574783841583],
  [12, -0.3548944861112799],
  [13, -0.2415738484925692],
  [14, -0.3537564570537629],
  [15, 0.4030400109335138],
  [16, -0.3571556982658774],
  [17, -0.3467438689708244],
  [18, 0.4030400109335138],
  [19, -0.3557156400591761],
]

const markLineData = [
  {
    xAxis: '5',
  },
  {
    xAxis: '6'
  },
]

const markAreaData = [
  [
    {
      xAxis: '10',
    },
    {
      xAxis: '11'
    }
  ],
  [
    {
      xAxis: '15',
    },
    {
      xAxis: '16'
    }
  ],
]

const chartContainer = ref(null)

onMounted(() => {
  const myChart = echarts.init(chartContainer.value)
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
        filterMode: 'none'
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
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'none'
      }
    ],
    tooltip: {
    },
  }
  myChart.setOption(option)
})
</script>

<style scoped></style>
