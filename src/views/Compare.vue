<template>
  <el-container>
    <el-col :span="8">
      <h2 class="mb-50">Load files to compare:</h2>
      <FilesDragUploader
        :en-file-raw="file1Raw"
        :ru-file-raw="file2Raw"
        :en-file-loaded="!!file1Raw[0]"
        :ru-file-loaded="!!file2Raw[0]"
      />
      <el-row justify="center" class="mb-50" style="margin-top: 30px;">
        <el-button
          type="success"
          @click="confirmLoading"
          :disabled="!file1Raw[0] || !file2Raw[0]"
        >
          Confirm
        </el-button>
        <el-popconfirm title="Are you sure to reset files?" @confirm="resetState">
          <template #reference>
            <el-button circle type="warning"><el-icon><refresh/></el-icon></el-button>
          </template>
        </el-popconfirm>
      </el-row>
      <el-row justify="space-evenly" class="mb-50">
        <div>
          <h3>Current state:</h3>
          <p>- Confirmed {{currentIndex}} / {{file1.length}} lines</p>
          <p>- Current line status:
            <span :style="{color: currentStatusComputed.color}">{{currentStatusComputed.text}}</span>
          </p>
        </div>
        <el-progress
          :width="200"
          type="dashboard"
          :status="currentStatus"
          :stroke-width="15"
          :percentage="+((currentIndex / file1.length * 100) || 0).toFixed(0)"
        >
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">Progress</span>
          </template>
        </el-progress>
      </el-row>
      <el-col
        v-if="file2.length && currentStatus && currentStatus !== 'success'"
        style="margin-left: 50px"
      >
        <h2>Status:</h2>
        <h3>
          <span :style="{color: currentStatusComputed.color}">{{currentStatusComputed.text}}</span>
          occurred in line {{currentIndex + 1}}
        </h3>
        <h3 v-if="nextSuccessLine !== Infinity">
          The next completely matching line's in
          <span style="color: #409eff">{{nextSuccessLine}}</span> line{{nextSuccessLine > 1 ? 's' : ''}}
        </h3>
        <h3 v-else style="color: #F56C6C">
          There are no matching lines in the files left!<br>
          It's recommended to stop the comparison!
        </h3>
        <el-row>
          <el-button
            type="primary"
            size="large"
            :disabled="currentIndex === file1.length"
            @click="skipAndContinue"
          >
            Skip and continue
          </el-button>
          <el-button type="danger" size="large" @click="stopComparing">Stop comparing</el-button>
        </el-row>
      </el-col>
    </el-col>
    <el-col :span="16">
      <h2 class="mb-50">Status messages:</h2>
      <StatusMessages :messages="messages" />
    </el-col>
  </el-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import FilesDragUploader from '@/components/FilesDragUploader'
import StatusMessages from '@/components/StatusMessages'
import statuses from '@/data/statuses'
import { comparableNames } from '@/store/modules/comparable'
import compareLines from '@/algorithms/compare/compareLines'
import getNextSuccessLine from '@/algorithms/compare/getNextSuccessLine'

const store = useStore()

const file1Raw = ref([])
const file2Raw = ref([])

const file1 = computed({
  get: () => store.state.comparable.file1,
  set: (value) => store.dispatch(comparableNames.setFile1, value)
})
const file2 = computed({
  get: () => store.state.comparable.file2,
  set: (value) => store.dispatch(comparableNames.setFile2, value)
})
const currentIndex = computed({
  get: () => store.state.comparable.currentIndex,
  set: (value) => store.commit(comparableNames.setCurrentIndex, value)
})
const currentStatus = computed({
  get: () => store.state.comparable.currentStatus,
  set: (value) => store.commit(comparableNames.setCurrentStatus, value)
})
const nextSuccessLine = computed({
  get: () => store.state.comparable.nextSuccessLine,
  set: (value) => store.commit(comparableNames.setNextSuccessLine, value)
})
const messages = computed({
  get: () => store.state.comparable.messages,
  set: (value) => store.commit(comparableNames.setMessages, value)
})

const currentStatusComputed = computed(() => statuses[currentStatus.value] ?? statuses.loading)

const confirmLoading = () => {
  file1.value = file1Raw.value[0].raw
  file2.value = file2Raw.value[0].raw

  file1Raw.value = []
  file2Raw.value = []
  store.commit(comparableNames.resetSecondaryState)
}

const resetState = () => {
  file1Raw.value = []
  file2Raw.value = []
  store.commit(comparableNames.resetState)
}

const start = () => {
  if (file1.value.length !== file2.value.length) {
    ElMessage.error('Files must have the same length')
    store.commit(comparableNames.resetState)
    return
  }
  cycleCompare()
}
const cycleCompare = async () => {
  for (let i = currentIndex.value; i < file1.value.length; i++) {
    const status = await asyncCompareHandler(i)
    if (!status) return
  }
  ElMessage.success('Comparing finished!')
}

const asyncCompareHandler = async (i) => {
  const { status, helper } = compareLines(file1.value[i], file2.value[i])
  currentStatus.value = status
  if (status !== 'success') {
    nextSuccessLine.value = getNextSuccessLine(i, file1.value, file2.value)
    messages.value.push({
      type: statuses[status],
      line: i + 1,
      file1Line: file1.value[i],
      file2Line: file2.value[i],
      helper
    })
    return false
  }
  currentIndex.value++
  return true
}

const skipAndContinue = () => {
  currentIndex.value++
  cycleCompare()
}

const stopComparing = () => {
  const messagesCopy = messages.value.slice()
  resetState()
  ElMessage.warning('Comparing stopped!')
  messages.value = messagesCopy
}

watch(file2, () => {
  if (file2.value.length) start()
})
</script>
<style scoped>
.mb-50 {
  margin-bottom: 50px;
}

.percentage-value {
  display: block;
  margin-top: -10px;
  font-size: 50px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 16px;
}
</style>
