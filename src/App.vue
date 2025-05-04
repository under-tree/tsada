<script setup>
</script>

<template>

  <!-- <el-space>

    <router-link to="/tsada/">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Home
      </el-link>
    </router-link>

    <router-link to="/tsada/grid">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        Grid
      </el-link>
    </router-link>

    <router-link to="/tsada/demo-a">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        A
      </el-link>
    </router-link>

    <router-link to="/tsada/demo-b">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        B
      </el-link>
    </router-link>

    <router-link to="/tsada/demo-c">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        C
      </el-link>
    </router-link>

    <router-link to="/tsada/demo-d">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        D
      </el-link>
    </router-link>

    <router-link to="/tsada/demo-e">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        E
      </el-link>
    </router-link>

    <router-link to="/tsada/demo-f">
      <el-link
        class="text-2xl"
        type="primary"
        :underline="false"
      >
        F
      </el-link>
    </router-link>

  </el-space> -->

  <el-header class="flex items-center">
    <el-space>
      <router-link to="/tsada/"><el-link type="primary" :underline="false">首页</el-link></router-link>
      <router-link to="/tsada/demo-f"><el-link type="primary" :underline="false">预览数据</el-link></router-link>
      <router-link to="/tsada/demo-e"><el-link type="primary" :underline="false">组装数据</el-link></router-link>
      <router-link to="/tsada/demo-d"><el-link type="primary" :underline="false">检测异常</el-link></router-link>
      <router-link to="/tsada/demo-c"><el-link type="primary" :underline="false">对比分析</el-link></router-link>
    </el-space>
  </el-header>

  <el-divider class="mt-0" />

  <router-view></router-view>

</template>

<style scoped></style>
