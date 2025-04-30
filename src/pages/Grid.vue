<script setup>
import SingleTimeSeriseChart from '../components/SingleTimeSeriseChart.vue'
import MultipleTimeSeriseChart from '../components/MultipleTimeSeriseChart.vue'
import Radar from '../components/Radar.vue'
import Gantt from '../components/Gantt.vue'
import DatasetTable from '../components/DatasetTable.vue'
import { ref } from 'vue'
import { data, uData } from '../components/data'

const multipleData = [
  data,
  data.map(point => [point[0], point[1] * 2]),
  data.map(point => [point[0], point[1] / 2]),
  data.map(point => [point[0], point[1] + 0.5]),
  data.map(point => [point[0], point[1] - 0.5])
]

// ---- ---- ---- ----

const models = {
  ARIMA: '',
  TadGAN: '',
  AER: '',
}
const datasets = {
  UCR: '',
  NAB: '',
  YAHOO: '',
}
const datasets2 = {
  A: '',
  B: '',
  C: '',
}
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const options1 = Object.keys(models).map(key => ({ value: key, label: key }))
const options2 = Object.keys(datasets).map(key => ({ value: key, label: key }))
const options3 = Object.keys(datasets).map(key => ({ value: key, label: key }))
const options4 = Object.keys(datasets2).map(key => ({ value: key, label: key }))

const dynamicTags = ref(['UCR UCR UCR UCRUCRUCR UCR', 'NAB', 'YAHOO'])

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
</script>

<template>
  <div class="w-250 m-0 m-auto">

    <el-row :gutter="16">

      <el-col :span="8">
        <el-card class="h-37.5">

          <el-select
            v-model="value1"
            placeholder="选择模型"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <div class="h-4"></div>

          <el-select
            v-model="value2"
            placeholder="选择数据"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-37.5">

          <el-select
            v-model="value3"
            placeholder="内置数据集"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <div class="h-4"></div>

          <el-select
            v-model="value4"
            placeholder="自定义数据"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="h-37.5"></el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="h-37.5"></el-card>
      </el-col>

    </el-row>

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-80">
          <div class="h-80">
            <Gantt :dataDimension="4" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">

        <el-row :gutter="16">
          <el-col :span="24">
            <el-card class="h-37.5 ">

              <div class="h-20 flex flex-wrap gap-x-2">
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  closable
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
              </div>

              <el-button
                type="primary"
                plain
              >导入数据</el-button>
              <el-button
                type="primary"
                plain
              >保存数据</el-button>

            </el-card>
          </el-col>
        </el-row>

        <el-row
          :gutter="16"
          class="!mb-0"
        >
          <el-col :span="12">
            <el-card class="h-37.5"></el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="h-37.5"></el-card>
          </el-col>
        </el-row>

      </el-col>

    </el-row>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card class="h-37.5">
          <el-steps
            class="mt-8"
            :active="1"
            align-center
          >
            <el-step title="查看数据"><template #icon>
                <div class="i-ep-search text-2xl" />
              </template> </el-step>
            <el-step title="导入数据"><template #icon>
                <div class="i-ep-download text-2xl" />
              </template> </el-step>
            <el-step title="编辑数据"><template #icon>
                <div class="i-ep-edit text-2xl" />
              </template> </el-step>
            <el-step title="保存数据"><template #icon>
                <div class="i-ep-upload text-2xl" />
              </template> </el-step>
          </el-steps>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="h-37.5">
          <div class="grid grid-cols-2 gap-4 justify-items-center items-center">
            <div class="i-ep-data-analysis text-5xl" />
            <div class="i-ep-data-line text-5xl" />
            <div class="i-ep-set-up text-5xl" />
            <div class="i-ep-tools text-5xl" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="h-37.5">
          <div class="grid grid-cols-2 gap-4 justify-items-center items-center">
            <div class="i-ep-document text-5xl" />
            <div class="i-ep-filter text-5xl" />
            <div class="i-ep-help text-5xl" />
            <div class="i-ep-guide text-5xl" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-80">
          <div class="h-80">
            <SingleTimeSeriseChart :timeseries="data" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-80">
          <div class="h-80">
            <Radar />
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-80">
          <div class="h-80">
            <MultipleTimeSeriseChart :timeseries="multipleData" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-80"></el-card>
      </el-col>

    </el-row>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card class="h-37.5">
          <el-steps
            class="mt-8"
            :active="1"
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
      <el-col :span="4">
        <el-card class="h-37.5">
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="h-37.5">
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-80">
          <el-scrollbar height="20rem">
            <DatasetTable :data="uData" />
          </el-scrollbar>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-80"></el-card>
      </el-col>

    </el-row>

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-80"></el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-80"></el-card>
      </el-col>

    </el-row>

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-37.5"></el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="h-37.5"></el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="h-37.5 flex items-center justify-center">
          <div class="i-ep-circle-plus text-7xl" />
        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="16">

      <el-col :span="8">
        <el-card class="h-37.5"></el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-37.5"></el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="h-37.5"></el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="h-37.5"></el-card>
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
