<script setup>
import { ref } from 'vue'
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
            </el-card>
          </el-col>

          <el-col
            :span="24"
            :xs="12"
          >
            <el-card class="h-37.5 ">
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
