<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})

const chartContainer = ref(null)
let myChart = null
let resizeObserver = null

const createChartOption = (data) => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
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
