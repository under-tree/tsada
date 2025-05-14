<template>

  <div class="flex items-center space-x-4">

    <div class="menu-wrapper">

      <el-button @click="toggleComponentVisibility">
        {{ isMenuVisible ? '隐藏菜单' : '显示菜单' }}
      </el-button>

      <div
        v-if="isMenuVisible"
        class="my-border w-100 h-30 p-4 rounded-xl menu-container"
      >

        <el-select
          v-model="value"
          placeholder="Select"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          class="ml-2"
          type="primary"
          size="large"
          @click="runAlgorithm"
          :disabled="!value"
          v-loading.fullscreen.lock="fullscreenLoading"
        >
          运行
        </el-button>

        <div class="my-2">
          <el-checkbox-group
            v-model="checkedOptions"
            @change="updateChart"
          >
            <el-checkbox
              v-for="option in checkboxOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-checkbox-group>
        </div>

        <div class="my-2">
          <span>点异常：{{ pointAnomalyCount }}，区间异常：{{ areaAnomalyCount }}</span>
        </div>

      </div>

    </div>

    <el-button @click="focusNextAnomaly">寻找异常</el-button>
    <el-button @click="focusPreviousAnomaly">上一个</el-button>
    <el-button @click="focusNextAnomaly">下一个</el-button>
    <span v-if="currentAnomalyLabel">当前异常：{{ currentAnomalyLabel }}</span>

  </div>

  <div
    class="w-full h-full"
    ref="chartContainer"
  ></div>

</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import { data } from './data'
import { cacheData } from '../pages/cache_data'
import { timeseriesData } from '../pages/timeseries_data'

function convertArray(array) {
  return array.map((subArray, index) => [index, subArray[0]])
}

function convertToAnomalies(indices) {
  if (!Array.isArray(indices) || indices.length === 0) {
    return []
  }

  indices.sort((a, b) => a - b)
  const anomalies = []
  let start = indices[0]
  let end = indices[0]

  for (let i = 1; i < indices.length; i++) {
    if (indices[i] === end + 1) {
      end = indices[i]
    } else {
      // 注意：与 TimeSeriesChart 中的格式不一致
      anomalies.push(start === end ? start : [start, end])
      start = indices[i]
      end = indices[i]
    }
  }

  anomalies.push(start === end ? start : [start, end])

  return anomalies
}

const timeseriesName = '001_NAB_id_1_Facility_tr_1007_1st_2014.csv'
const timeseries = timeseriesData[timeseriesName]
const models = [
  'IForest',
  'AutoEncoder',
  'OFA',
]

const filteredData = cacheData.filter(item => item.dataset === timeseriesName && models.includes(item.model))
const detectionResults = filteredData.reduce((acc, item) => {
  const model = item.model
  const anomalyIndices = item.anomaly_indices
  acc[model] = convertToAnomalies(anomalyIndices)
  console.log(acc)
  return acc
}, {})

const algorithmColors = {
  IForest: 'rgb(50, 209, 88)',
  AutoEncoder: 'rgb(255, 214, 10)',
  OFA: 'rgb(255, 48, 55)',
}

const ZOOM_WIDTH = 100
const SIMULATION_TIME = 500

const value = ref('')
const options = Object.keys(detectionResults).map(key => ({ value: key, label: key }))
const checkboxOptions = ref([])
const checkedOptions = ref([])
const fullscreenLoading = ref(false)
const isMenuVisible = ref(false)
const chartContainer = ref(null)
const pointAnomalyCount = ref(0)
const areaAnomalyCount = ref(0)
const currentAnomalyLabel = ref('')

let myChart = null
let anomalyList = []
let currentAnomalyIndex = -1

const runAlgorithm = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    if (!checkboxOptions.value.includes(value.value)) {
      checkboxOptions.value.push(value.value)
    }
    fullscreenLoading.value = false
  }, SIMULATION_TIME)
}

const toggleComponentVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const initECharts = () => {
  myChart = echarts.init(chartContainer.value)
  updateChart()
}

const initResizeObserver = () => {
  const resizeObserver = new ResizeObserver(() => myChart?.resize())
  resizeObserver.observe(chartContainer.value)
  onUnmounted(() => {
    resizeObserver.disconnect()
    myChart?.dispose()
    myChart = null
  })
}

const updateChart = () => {
  let markLineData = []
  let markAreaData = []
  anomalyList = []

  checkedOptions.value.forEach(algorithm => {
    const result = detectionResults[algorithm]
    const color = algorithmColors[algorithm]
    const transparentColor = color.replace('rgb', 'rgba').replace(')', ', 0.2)')

    result.forEach(item => {
      if (Array.isArray(item)) {
        markAreaData.push([{ xAxis: item[0], itemStyle: { color: transparentColor } }, { xAxis: item[1] }])
        anomalyList.push({ x: item[0], label: `x = ${item[0]}~${item[1]} (${algorithm})`, type: 'area', color })
      } else {
        markLineData.push({ xAxis: item, itemStyle: { color } })
        anomalyList.push({ x: item, label: `x = ${item} (${algorithm})`, type: 'point', color })
      }
    })
  })

  anomalyList.sort((a, b) => a.x - b.x)
  pointAnomalyCount.value = markLineData.length
  areaAnomalyCount.value = markAreaData.length

  myChart.setOption({
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '15%'
    },
    series: [{
      type: 'line',
      smooth: true,
      symbolSize: 5,
      data: convertArray(timeseries),
      markLine: { data: markLineData, symbol: ['none', 'none'], lineStyle: { type: 'solid' } },
      markArea: { data: markAreaData },
    }],
    xAxis: { min: -10, type: 'value', axisLine: { onZero: false } },
    yAxis: { type: 'value', axisLine: { onZero: false } },
    dataZoom: [
      { type: 'slider', xAxisIndex: 0, filterMode: 'none', startValue: 0, endValue: 100 },
      { type: 'slider', yAxisIndex: 0, filterMode: 'none', width: 10 },
      { type: 'inside', xAxisIndex: 0, filterMode: 'none' },
    ],
    tooltip: {},
  })
}

const focusNextAnomaly = () => {
  if (!myChart || anomalyList.length === 0) return
  currentAnomalyIndex = (currentAnomalyIndex + 1) % anomalyList.length
  updateView()
}

const focusPreviousAnomaly = () => {
  if (!myChart || anomalyList.length === 0) return
  currentAnomalyIndex = (currentAnomalyIndex - 1 + anomalyList.length) % anomalyList.length
  updateView()
}

const updateView = () => {
  const { x: targetX, label } = anomalyList[currentAnomalyIndex]
  currentAnomalyLabel.value = label
  myChart.dispatchAction({ type: 'dataZoom', startValue: Math.max(targetX - ZOOM_WIDTH / 2, -10), endValue: targetX + ZOOM_WIDTH / 2 })
}

onMounted(() => {
  initECharts()
  initResizeObserver()
})
</script>

<style scoped>
.menu-wrapper {
  position: relative;
  display: inline-block;
}

.menu-container {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  margin-top: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
