<script setup>
</script>

<template>
  <div class="w-250 m-0 m-auto">

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

    <el-row :gutter="16">

      <el-col :span="16">
        <el-card class="h-80"></el-card>
      </el-col>

      <el-col :span="8">
        <el-row :gutter="16">
          <el-col :span="24">
            <el-card class="h-37.5"></el-card>
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

      <el-col :span="16">
        <el-card class="h-80"></el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h-80"></el-card>
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
