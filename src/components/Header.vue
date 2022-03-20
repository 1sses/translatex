<template>
  <el-header class="header">
    <h1>TranslateX</h1>
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Translate" name="/">Translate file</el-tab-pane>
      <el-tab-pane label="Compare" name="/compare">Compare files</el-tab-pane>
    </el-tabs>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeName: location.pathname
    }
  },
  methods: {
    handleClick (tab) {
      this.$router.push(tab.props.name)
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
