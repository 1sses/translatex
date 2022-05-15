<template>
  <el-header class="header">
    <h1>TranslateX</h1>
    <el-row align="middle">
      <TranslationApiDrawer style="margin-right: 50px" />
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Translate" name="/">Translate file</el-tab-pane>
        <el-tab-pane label="Analyse" name="/analyse">File analysis</el-tab-pane>
        <el-tab-pane label="Compare" name="/compare">Compare files</el-tab-pane>
      </el-tabs>
    </el-row>
  </el-header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TranslationApiDrawer from '@/components/TranslationApiDrawer'

const activeName = ref(location.pathname)

const router = useRouter()

const handleClick = (tab) => {
  router.push(tab.props.name)
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
