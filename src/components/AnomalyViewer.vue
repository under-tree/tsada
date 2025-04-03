<script setup>
import Single from './SingleTimeSeriseChart.vue'
import Multiple from './MultipleTimeSeriseChart.vue'
import { ref } from 'vue'
import { data } from './data'

const multipleData = [
  data,
  data.map(point => [point[0], point[1] * 2]),
  data.map(point => [point[0], point[1] / 2]),
  data.map(point => [point[0], point[1] + 0.5]),
  data.map(point => [point[0], point[1] - 0.5])
]

const radio = ref('Single')
</script>

<template>

  <div>
    <el-radio-group v-model="radio">
      <el-radio-button
        label="Single"
        value="Single"
      />
      <el-radio-button
        label="Multiple"
        value="Multiple"
      />
    </el-radio-group>
  </div>

  <div class="h-[80svh] w-4/5 p-8">
    <Single
      v-if="radio == 'Single'"
      :timeseries="data"
    />
    <Multiple
      v-else-if="radio == 'Multiple'"
      :timeseries="multipleData"
    />
  </div>

</template>

<style scoped></style>
