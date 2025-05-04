<script setup>
</script>

<template>

  <div class="mx-10">
    <div class="max-w-200 m-0 m-auto">

      <h2>数据组装流程</h2>
      <el-row :gutter="16">
        <el-col :span="24">
          <el-card class="h-37.5">
            <el-steps
              class="mt-8"
              :active="4"
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
      </el-row>

      <h2>异常检测流程</h2>
      <el-row :gutter="16">
        <el-col :span="24">
          <el-card class="h-37.5">
            <el-steps
              class="mt-8"
              :active="4"
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
