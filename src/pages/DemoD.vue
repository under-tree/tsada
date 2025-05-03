<script setup>
import SingleTimeSeriseChart from '../components/SingleTimeSeriseChart.vue'
import Radar from '../components/Radar.vue'
import { ref } from 'vue'
import { data, uData } from '../components/data'

const radarData = {
  ARIMA: [0.42, 0.30, 0.40, 0.35, 0.50, 0.18],
  TadGAN: [0.50, 0.64, 0.78, 0.66, 0.82, 0.51],
  AER: [0.45, 0.53, 0.52, 0.34, 0.60, 0.33],
}

const models = ['ARIMA', 'TadGAN', 'AER']

const step = ref(0)
const modelSelectValue = ref('')
const dataSelectValue = ref('')

const modelOptions = models.map(key => ({ value: key, label: key }))
const datasetOptions = uData.map(value => ({ value: value.name, label: value.name }))

const handleDataSelectChange = (value) => {
  // console.log('Selected data:', value)
  step.value = 1
}

const handleModelSelectChange = (value) => {
  // console.log('Selected model:', value)
  step.value = 2
}
</script>

<template>
  <div class="max-w-250 m-0 m-auto">

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-37.5">
          <el-steps
            class="mt-8"
            :active="step"
            align-center
          >
            <el-step title="导入数据"><template #icon>
                <div class="i-ep-download text-2xl" />
              </template> </el-step>
            <el-step title="选择模型"><template #icon>
                <div class="i-ep-set-up text-2xl" />
              </template> </el-step>
            <el-step title="查看异常"><template #icon>
                <div class="i-ep-search text-2xl" />
              </template> </el-step>
            <el-step title="分析性能"><template #icon>
                <div class="i-ep-data-analysis text-2xl" />
              </template> </el-step>
          </el-steps>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-37.5">

          <el-select
            v-model="dataSelectValue"
            placeholder="选择数据"
            size="large"
            style="width: 240px"
            @change="handleDataSelectChange"
          >
            <el-option
              v-for="item in datasetOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <div class="h-4"></div>

          <el-select
            v-model="modelSelectValue"
            placeholder="选择模型"
            size="large"
            style="width: 240px"
            @change="handleModelSelectChange"
          >
            <el-option
              v-for="item in modelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card
          class="h-80"
          @click="step = 2"
        >
          <div class="h-70">
            <SingleTimeSeriseChart :timeseries="data" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card
          class="h-80"
          @click="step = 3"
        >
          <div class="h-80">
            <Radar :data="{ [modelSelectValue]: radarData[modelSelectValue] }" />
          </div>
        </el-card>
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
