<script setup>
import TimeSeriesChart from '../components/TimeSeriesChart.vue'
import Radar from '../components/Radar.vue'
import { ref, watch, computed } from 'vue'
import axios from 'axios'
import { uData } from '../components/data'

const radarData = {
  ARIMA: [0.42, 0.30, 0.40, 0.35, 0.50, 0.18],
  TadGAN: [0.50, 0.64, 0.78, 0.66, 0.82, 0.51],
  AER: [0.45, 0.53, 0.52, 0.34, 0.60, 0.33],
}

const datasetValue = ref('')
const fileValue = ref('')

const filenames = ref([])
const files = computed(() => filenames.value.map(value => ({ value, label: value })))

let datasets = ref(uData.map(value => ({ value: value.name, label: value.name })))

watch(datasetValue, async (newVal) => {
  try {
    const response = await axios.get(`/api/datasets/${newVal}`)
    filenames.value = response.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="w-250 m-0 m-auto">

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-120">
          <div class="h-105">
            <TimeSeriesChart />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">

        <el-row :gutter="16">
          <el-col :span="24">
            <el-card class="h-37.5 ">

              <el-select
                v-model="datasetValue"
                placeholder="数据集"
                size="large"
                style="width: 240px"
              >
                <el-option
                  v-for="item in datasets"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>

              <div class="h-4"></div>

              <el-select
                v-model="fileValue"
                placeholder="文件列表"
                size="large"
                style="width: 240px"
              >
                <el-option
                  v-for="item in files"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>

            </el-card>
          </el-col>
        </el-row>

        <el-row
          :gutter="16"
          class="!mb-0"
        >
          <el-col :span="24">
            <el-card class="h-77.5">
              <div class="h-77.5">
                <Radar :data="radarData" />
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-col>

    </el-row>

  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 1rem;
}

.el-col {
  border-radius: 1rem;
}
</style>
