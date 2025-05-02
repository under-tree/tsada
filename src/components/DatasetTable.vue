<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
})

const emits = defineEmits(['row-clicked'])

const handleRowClick = (row) => {
  emits('row-clicked', row)
}
</script>

<template>
  <el-table
    :data="data"
    stripe
    @row-click="handleRowClick"
  >
    <el-table-column
      prop="name"
      label="名称"
    />
    <el-table-column
      prop="tsCurated"
      label="数量"
    />
    <el-table-column
      prop="avgDim"
      label="维度"
    />
    <el-table-column
      prop="avgTsLen"
      label="平均长度"
    />
    <el-table-column
      prop="avgAnomalyCount"
      label="异常数量"
    />
    <el-table-column
      prop="avgAnomalyLen"
      label="异常长度"
    />
    <el-table-column
      prop="anomalyRatio"
      label="异常占比"
    />
    <!-- <el-table-column
      prop="category"
      label="异常类型"
    /> -->
  </el-table>
</template>

<style scoped></style>
