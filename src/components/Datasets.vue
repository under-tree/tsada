<script setup>
import DatasetTable from './DatasetTable.vue'
import { uData, mData } from './data.js'
</script>

<template>

  <div class="h-4"></div>

  <!-- Univariate Datasets -->
  <DatasetTable :data="uData" />
  <!-- Multivariate Datasets -->
  <DatasetTable :data="mData" />

</template>

<style scoped></style>
