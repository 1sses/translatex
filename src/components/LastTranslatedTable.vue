<template>
  <el-row>
    <h2>Last translated:</h2>
    <el-table :data="latestLines">
      <el-table-column prop="line" label="Number" width="100" />
      <el-table-column prop="text" label="Text" />
    </el-table>
  </el-row>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  latestLines: {
    type: Array,
    required: true
  }
})

</script>

<style scoped>

</style>
