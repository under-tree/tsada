<script setup>
import SingleTimeSeriseChart from '../components/SingleTimeSeriseChart.vue'
import Radar from '../components/Radar.vue'
import { ref, computed } from 'vue'
// import { data, uData } from '../components/data'
import { cacheData } from './cache_data'
import { datasetList, modelList } from './cache_data'
import { timeseriesData } from './timeseries_data'

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
      anomalies.push(start === end ? [start] : [start, end])
      start = indices[i]
      end = indices[i]
    }
  }

  anomalies.push(start === end ? [start] : [start, end])

  return anomalies
}

const radarData = computed(() => {
  const filteredData = cacheData.filter(item => item.dataset === dataSelectValue.value)
  return filteredData.reduce((acc, item) => {
    const model = item.model
    const metrics = item.metrics
    if (!acc[model]) {
      acc[model] = []
    }
    acc[model].push(metrics['PA-F1'])
    acc[model].push(metrics['Event-based-F1'])
    acc[model].push(metrics['R-based-F1'])
    acc[model].push(metrics['Affiliation-F'])
    acc[model].push(metrics['AUC-PR'])
    acc[model].push(metrics['AUC-ROC'])
    return acc
  }, {})
})

const models = modelList

const step = ref(0)
const modelSelectValue = ref('')
const dataSelectValue = ref('551_YAHOO_id_1_Synthetic_tr_500_1st_893.csv')

const anomaliesData = computed(() => {
  const selectedData = cacheData.find(
    item => item.dataset === dataSelectValue.value && item.model === modelSelectValue.value
  );
  return selectedData ? convertToAnomalies(selectedData.anomaly_indices) : [];
});

const modelOptions = models.map(key => ({ value: key, label: key }))
const datasetOptions = datasetList.map(value => ({ value: value, label: value }))

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
  <div class="mx-10">
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
              <SingleTimeSeriseChart
                :timeseries="convertArray(timeseriesData[dataSelectValue])"
                :anomalies="anomaliesData"
              />
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
