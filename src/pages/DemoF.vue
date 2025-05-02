<script setup>
import DatasetTable from '../components/DatasetTable.vue'
import Single from '../components/SingleTimeSeriseChart.vue'
import Multiple from '../components/MultipleTimeSeriseChart.vue'
import { ref, watch } from 'vue'
import { data, uData, mData } from '../components/data'

const multipleData = [
  data,
  data.map(point => [point[0], point[1] * 2]),
  data.map(point => [point[0], point[1] / 2]),
  data.map(point => [point[0], point[1] + 0.5]),
  data.map(point => [point[0], point[1] - 0.5])
]

function convertArray(array) {
  return array.map((subArray, index) => [index, subArray[0]])
}

function convertArray2(array) {
  const result = []
  const numColumns = array[0].length

  for (let col = 0; col < numColumns; col++) {
    const columnData = []
    for (let row = 0; row < array.length; row++) {
      columnData.push([row, array[row][col]])
    }
    result.push(columnData)
  }
  return result
}

// todo
const filenames = ['A.csv', 'B.csv', 'C.csv', 'D.csv', 'E.csv']

const datasetValue = ref('')
const fileValue = ref('')

let datasets = ref(uData.map(value => ({ value: value.name, label: value.name })))
const files = filenames.map(value => ({ value, label: value }))

const radio = ref('Single')
watch(radio, (newVal) => {
  if (newVal === 'Single') {
    datasets.value = uData.map(value => ({ value: value.name, label: value.name }))
  } else {
    datasets.value = mData.map(value => ({ value: value.name, label: value.name }))
  }
})

const handleSelectChange = (value) => {
  // console.log(datasetValue.value)
}

const handleRowClicked = (row) => {
  datasetValue.value = row.name
}

const handleImportData = () => { }

</script>

<template>
  <div class="max-w-250 m-0 m-auto">

    <el-row :gutter="16">

      <el-col
        :span="16"
        :xs="24"
        class="mb-4"
      >
        <el-card class="h-80">
          <div class="h-70">
            <el-scrollbar height="17.5rem">
              <DatasetTable
                :data="radio === 'Single' ? uData : mData"
                @row-clicked="handleRowClicked"
              />
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>

      <el-col
        :span="8"
        :xs="24"
      >

        <el-row :gutter="16">
          <el-col
            :span="24"
            :xs="12"
            class="mb-4"
          >
            <el-card class="h-37.5">
              <div>
                <el-radio-group v-model="radio">
                  <el-radio-button
                    label="单变量"
                    value="Single"
                  />
                  <el-radio-button
                    label="多变量"
                    value="Multiple"
                  />
                </el-radio-group>
              </div>

              <div class="h-6"></div>

              <el-select
                v-model="datasetValue"
                placeholder="数据集"
                size="large"
                style="width: 240px"
                @change="handleSelectChange"
              >
                <el-option
                  v-for="item in datasets"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-card>
          </el-col>

          <el-col
            :span="24"
            :xs="12"
          >
            <el-card class="h-37.5 ">
              <el-select
                v-model="fileValue"
                placeholder="文件列表"
                size="large"
                style="width: 240px"
                @change="handleSelectChange"
              >
                <el-option
                  v-for="item in files"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>

              <div class="h-6"></div>

              <el-button
                type="primary"
                plain
                @click="handleImportData"
              >
                预览数据
              </el-button>
            </el-card>
          </el-col>
        </el-row>

      </el-col>

    </el-row>

    <el-row :gutter="16">

      <el-col
        :span="16"
        :xs="24"
        class="mb-4"
      >
        <el-card class="h-80">
          <div class="h-70">
            <Single
              v-if="radio == 'Single'"
              :timeseries="data"
            />
            <Multiple
              v-else-if="radio == 'Multiple'"
              :timeseries="multipleData"
            />
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<style scoped>
/* .el-row {
  margin-bottom: 1rem;
} */

.el-col {
  border-radius: 1rem;
}
</style>
