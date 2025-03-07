<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)

onMounted(() => {
  const myChart = echarts.init(chartContainer.value)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '异常类型',
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
        data: [
          { value: 104, name: 'A' },
          { value: 735, name: 'B' },
          { value: 580, name: 'C' },
          { value: 484, name: 'D' },
          { value: 500, name: 'E' }
        ]
      }
    ]
  }

  myChart.setOption(option)
})

const width = ref(5)
</script>

<template>

  <div class="h-[80vh]">

    <div
      class="h-full"
      ref="chartContainer"
    ></div>

    <el-slider
      class="slider"
      v-model="width"
      :min="1"
      :max="10"
    />

  </div>

</template>

<style scoped>
.slider {
  width: 20%;
  margin: 0 auto;
}
</style>
