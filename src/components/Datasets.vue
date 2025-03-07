<template>

  <div class="h-4"></div>

  <div class="pl-4">
    <el-table
      :data="tableData"
      style="width: 80%"
    >
      <el-table-column
        prop="name"
        label="数据集"
      />
      <el-table-column
        prop="tsCollected"
        label="数据数量"
      />
      <el-table-column
        prop="avgDim"
        label="数据维度"
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
        label="异常率"
      />
      <el-table-column
        prop="category"
        label="类型"
      />
    </el-table>
  </div>

</template>

<script setup>
const tableData = [
  {
    name: 'UCR',
    tsCollected: 250,
    avgDim: 1,
    avgTsLen: 67818.7,
    avgAnomalyCount: 1,
    avgAnomalyLen: 198.9,
    anomalyRatio: '0.6%',
    category: 'P&Seq'
  },
  {
    name: 'NAB',
    tsCollected: 58,
    avgDim: 1,
    avgTsLen: 5099.7,
    avgAnomalyCount: 1.6,
    avgAnomalyLen: 370.1,
    anomalyRatio: '10.6%',
    category: 'Seq'
  },
  {
    name: 'YAHOO',
    tsCollected: 367,
    avgDim: 1,
    avgTsLen: 1560.2,
    avgAnomalyCount: 5.5,
    avgAnomalyLen: 2.5,
    anomalyRatio: '0.6%',
    category: 'P&Seq'
  },
  {
    name: 'IOPS',
    tsCollected: 58,
    avgDim: 1,
    avgTsLen: 72792.3,
    avgAnomalyCount: 25.6,
    avgAnomalyLen: 48.7,
    anomalyRatio: '1.3%',
    category: 'Seq'
  },
  {
    name: 'MGAB',
    tsCollected: 10,
    avgDim: 1,
    avgTsLen: 97777.8,
    avgAnomalyCount: 9.7,
    avgAnomalyLen: 20.0,
    anomalyRatio: '0.2%',
    category: 'Seq'
  },
  {
    name: 'WSD',
    tsCollected: 210,
    avgDim: 1,
    avgTsLen: 17444.5,
    avgAnomalyCount: 5.1,
    avgAnomalyLen: 25.4,
    anomalyRatio: '0.6%',
    category: 'Seq'
  },
  {
    name: 'SED',
    tsCollected: 6,
    avgDim: 1,
    avgTsLen: 23332.3,
    avgAnomalyCount: 14.7,
    avgAnomalyLen: 64.0,
    anomalyRatio: '4.1%',
    category: 'Seq'
  },
  {
    name: 'TODS',
    tsCollected: 15,
    avgDim: 1,
    avgTsLen: 5000.0,
    avgAnomalyCount: 97.3,
    avgAnomalyLen: 18.7,
    anomalyRatio: '6.3%',
    category: 'P&Seq'
  },
  {
    name: 'NEK',
    tsCollected: 48,
    avgDim: 1,
    avgTsLen: 1073.0,
    avgAnomalyCount: 2.9,
    avgAnomalyLen: 51.1,
    anomalyRatio: '8.0%',
    category: 'P&Seq'
  },
  {
    name: 'Stock',
    tsCollected: 90,
    avgDim: 1,
    avgTsLen: 15000.0,
    avgAnomalyCount: 1246.9,
    avgAnomalyLen: 1.1,
    anomalyRatio: '9.4%',
    category: 'P&Seq'
  }
]
</script>