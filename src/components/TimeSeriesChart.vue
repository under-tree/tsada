<template>

  <div class="flex items-center space-x-4">
    <span>点异常：{{ pointAnomalyCount }}，区间异常：{{ areaAnomalyCount }}</span>
    <button @click="focusNextAnomaly">寻找异常</button>
    <span v-if="currentAnomalyLabel">当前异常：{{ currentAnomalyLabel }}</span>
    <button @click="focusPreviousAnomaly">上一个</button>
    <button @click="focusNextAnomaly">下一个</button>
  </div>

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
let anomalyList = []
let currentAnomalyIndex = -1
const currentAnomalyLabel = ref('')
const pointAnomalyCount = ref(0)
const areaAnomalyCount = ref(0)

onMounted(() => {
  myChart = echarts.init(chartContainer.value)

  anomalyList = [
    ...markLineData.map(item => ({
      x: Number(item.xAxis),
      label: `x = ${item.xAxis}`,
      type: 'point'
    })),
    ...markAreaData.map(area => ({
      x: Number(area[0].xAxis),  // 取区间的第一个横坐标
      label: `x = ${area[0].xAxis}~${area[1].xAxis}`,
      type: 'area'
    }))
  ].sort((a, b) => a.x - b.x)

  pointAnomalyCount.value = markLineData.length
  areaAnomalyCount.value = markAreaData.length

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
        startValue: 0,
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
    tooltip: {},
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

// 让 dataZoom 聚焦到下一个异常点
const focusNextAnomaly = () => {
  if (!myChart || anomalyList.length === 0) return

  currentAnomalyIndex = (currentAnomalyIndex + 1) % anomalyList.length
  updateView()
}

// 让 dataZoom 聚焦到上一个异常点
const focusPreviousAnomaly = () => {
  if (!myChart || anomalyList.length === 0) return

  currentAnomalyIndex = (currentAnomalyIndex - 1 + anomalyList.length) % anomalyList.length
  updateView()
}

// 更新视图和异常信息
const updateView = () => {
  const { x: targetX, label } = anomalyList[currentAnomalyIndex]

  currentAnomalyLabel.value = label

  // 计算 startValue 和 endValue，使异常点（区间）居中
  const zoomWidth = 100
  const startValue = Math.max(targetX - zoomWidth / 2, data[0][0])
  const endValue = startValue + zoomWidth

  myChart.dispatchAction({
    type: 'dataZoom',
    startValue,
    endValue
  })
}
</script>

<style scoped></style>
