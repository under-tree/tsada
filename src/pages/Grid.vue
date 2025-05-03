<script setup>
</script>

<template>
  <div class="w-250 m-0 m-auto">

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
        <el-card class="h-37.5 flex items-center justify-center">
          <div class="i-ep-circle-plus text-7xl" />
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
        </el-card>
      </el-col>

      <el-col :span="8">

        <el-row :gutter="16">
          <el-col :span="24">
            <el-card class="h-37.5 ">
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
        <el-card class="h-37.5"></el-card>
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
