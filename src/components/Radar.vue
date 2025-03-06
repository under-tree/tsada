<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)

onMounted(() => {
  const myChart = echarts.init(chartContainer.value)
  const option = {
    title: {
      text: '性能指标'
    },
    legend: {
      data: ['ARIMA', 'TadGAN']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'PA-F1', max: 1 },
        { name: 'Event-based-F1	', max: 1 },
        { name: 'R-based-F1', max: 1 },
        { name: 'Affiliation-F1', max: 1 },
        { name: 'AUC-PR', max: 1 },
        { name: 'AUC-ROC', max: 1 }
      ]
    },
    series: [
      {
        name: 'ARIMA | TadGAN',
        type: 'radar',
        data: [
          {
            value: [0.42, 0.30, 0.20, 0.35, 0.50, 0.18],
            name: 'ARIMA'
          },
          {
            value: [0.50, 0.14, 0.28, 0.26, 0.42, 0.21],
            name: 'TadGAN'
          }
        ]
      }
    ]
  }

  myChart.setOption(option)
})
</script>

<template>
  <div
    class="h-[80vh]"
    ref="chartContainer"
  ></div>
</template>

<style scoped></style>
