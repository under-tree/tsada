<script setup>
</script>

<template>
  <!-- <div class="flex items-center"> -->
  <el-space>

    <router-link to="/">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Home
      </el-link>
    </router-link>

    <!-- <router-link to="/radar">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Radar
      </el-link>
    </router-link> -->

    <router-link to="/grid">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Grid
      </el-link>
    </router-link>

    <!-- <router-link to="/pie">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Pie
      </el-link>
    </router-link> -->

    <router-link to="/datasets">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Datasets
      </el-link>
    </router-link>

    <router-link to="/editor">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Editor
      </el-link>
    </router-link>

    <router-link to="/demo">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Demo
      </el-link>
    </router-link>

    <router-link to="/demo-a">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Demo A
      </el-link>
    </router-link>

    <router-link to="/demo-b">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Demo B
      </el-link>
    </router-link>

    <router-link to="/demo-c">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Demo C
      </el-link>
    </router-link>

  </el-space>
  <!-- </div> -->
  <router-view></router-view>
</template>

<style scoped></style>
