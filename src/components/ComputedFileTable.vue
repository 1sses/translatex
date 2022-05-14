<template>
  <div>
    <el-auto-resizer>
      <template #default="{ width }">
        <el-table-v2
          class="mb-50"
          :columns="columns"
          :data="displayedFile"
          :row-class="tableRowTypeGetter"
          :width="width"
          :height="800"
        />
      </template>
    </el-auto-resizer>
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

const columns = [
  {
    key: 'line',
    dataKey: 'line',
    title: '№',
    width: 70
  },
  {
    key: 'text',
    dataKey: 'text',
    title: 'Text'
  }
]

const store = useStore()

const type = computed(() => store.state.analyzed.type)

const tableRowTypeGetter = ({ rowData }) => {
  const rowType = getRowType(rowData.text, type.value)
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
.comment-row, .comment-row:hover {
  background: var(--el-color-primary-light-9);
}

.system-row, .system-row:hover {
  background: var(--el-color-info-light-9);
}

.speech-row, .speech-row:hover {
  background: var(--el-color-success-light-9);
}
</style>
