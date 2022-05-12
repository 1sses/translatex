<template>
  <div>
    <el-table class="mb-50" :data="displayedFile" :max-height="800" :row-class-name="tableRowTypeGetter">
      <el-table-column prop="line" label="№" width="70" />
      <el-table-column prop="text" label="Text" />
    </el-table>
    <el-row style="column-gap: 20px">
      <el-row align="middle">
        <div class="square" style="background: var(--el-color-info-light-9)" />
        <p>&nbsp; - system line</p>
      </el-row>
      <el-row align="middle">
        <div class="square" style="background: var(--el-color-success-light-9)" />
        <p>&nbsp; - speech</p>
      </el-row>
      <el-row align="middle">
        <div class="square" style="background: var(--el-color-primary-light-9)" />
        <p>&nbsp; - comment</p>
      </el-row>
    </el-row>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import getRowType from '@/algorithms/analyse/getRowType'

defineProps({
  displayedFile: {
    type: Array,
    required: true
  }
})

const store = useStore()

const type = computed(() => store.state.analyzed.type)

const tableRowTypeGetter = ({ row }) => {
  const rowType = getRowType(row.text, type.value)
  return `${rowType}-row`
}
</script>

<style scoped>
.square {
  width: 30px;
  height: 30px;
}
</style>
<style>
.el-table .comment-row {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}

.el-table .system-row {
  --el-table-tr-bg-color: var(--el-color-info-light-9);
}

.el-table .speech-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
