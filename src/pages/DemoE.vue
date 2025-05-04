<script setup>
import Gantt from '../components/Gantt.vue'
import { ref } from 'vue'

const metadata = {
  "UCR": [
    [0, 1, 10],
    [1, 1, 10],
    [2, 1, 15],
    [3, 1, 10],
    [4, 1, 15],
    [5, 1, 15],
    [6, 1, 15],
    [7, 1, 15],
    [8, 1, 15],
    [9, 1, 10],
  ],
  "NAB": [
    [0, 15, 20],
    [1, 15, 20],
    [2, 15, 20],
    [3, 15, 20],
    [4, 15, 20],
    [5, 15, 20],
    [6, 15, 20],
    [7, 15, 20],
    [8, 15, 20],
    [9, 15, 20],
  ],
  "YAHOO": [
    [0, 20, 25],
    [1, 20, 25],
    [2, 20, 25],
    [3, 20, 25],
    [4, 20, 25],
    [5, 20, 25],
    [6, 20, 25],
    [7, 20, 25],
  ],
}

const datasets = ['UCR', 'NAB', 'YAHOO']
const datasets2 = ['A', 'B', 'C']

const value3 = ref('')
const value4 = ref('')

const options3 = datasets.map(value => ({ value, label: value }))
const options4 = datasets2.map(value => ({ value, label: value }))

function transformData(data1, data2) {
  let result = []

  data1.forEach((item, index) => {
    const newIndex = index
    const [, start, end] = item
    const oldIndexPlusOne = index + 1
    const isSecond = false
    result.push([newIndex, start, end, oldIndexPlusOne, isSecond])
  })

  data2.forEach((item, index) => {
    const newIndex = index
    const [, start, end] = item
    const oldIndexPlusOne = index + 1
    const isSecond = true
    result.push([newIndex, start, end, oldIndexPlusOne, isSecond])
  })

  return result
}

function transformReceivedResult(data) {
  return data.map(item => {
    let newItem = [...item]
    newItem[3] = newItem[3] - 1
    if (newItem[4]) {
      newItem[4] = dynamicTags.value[1]
    } else {
      newItem[4] = dynamicTags.value[0]
    }
    return newItem
  })
}

const editorData = ref({
  "parkingApron": {
    "dimensions": ["Index + 1"],
    "data": []
  },
  "flight": {
    "dimensions": [
      "New Index",
      "Start",
      "End",
      "Old Index + 1",
      "isSecond"
    ],
    "data": transformData(metadata[datasets[0]], metadata[datasets[1]])
  }
})

const receivedResult = ref(editorData.value.flight.data)
const handleResultUpdate = (newResult) => {
  receivedResult.value = newResult
}

const dynamicTags = ref([datasets[0], datasets[1]])

const handleSelectChange = (newValue) => {
  if (dynamicTags.value.length < 2 && !dynamicTags.value.includes(newValue)) {
    dynamicTags.value.push(newValue)
  }
}

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const handleImportData = () => {
  editorData.value.flight.data = transformData(metadata[dynamicTags.value[0]], metadata[dynamicTags.value[1]])
}
const handleSaveData = () => {
  console.log(transformReceivedResult(receivedResult.value))
}
</script>

<template>
  <div class="mx-10">
    <div class="max-w-250 m-0 m-auto">

      <el-row :gutter="16">

        <el-col :span="16">
          <el-card class="h-120">
            <div class="h-100">
              <Gantt
                :dataDimension="4"
                :editorData="editorData"
                @updateResult="handleResultUpdate"
              />
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">

          <el-row :gutter="16">
            <el-col :span="24">
              <el-card class="h-37.5">

                <el-select
                  v-model="value3"
                  placeholder="内置数据集"
                  size="large"
                  style="width: 240px"
                  @change="handleSelectChange"
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
                  @change="handleSelectChange"
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
          </el-row>

          <el-row
            :gutter="16"
            class="!mb-0"
          >
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
                  @click="handleImportData"
                >
                  导入数据
                </el-button>
                <el-button
                  type="primary"
                  plain
                  @click="handleSaveData"
                >
                  保存数据
                </el-button>

              </el-card>
            </el-col>
          </el-row>

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
