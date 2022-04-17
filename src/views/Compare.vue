<template>
  <el-container>
    <el-col :span="8">
      <h2 class="mb-50">Load files to compare:</h2>
      <FileDragUploader
        :en-file-raw="file1Raw"
        :ru-file-raw="file2Raw"
        :en-file-loaded="!!file1Raw[0]"
        :ru-file-loaded="!!file2Raw[0]"
        @enFileChange="handleFile1Check"
        @ruFileChange="handleFile2Check"
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
      <el-row justify="space-evenly">
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
          :percentage="+((currentIndex / file1.length * 100) || 30).toFixed(0)"
        >
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">Progress</span>
          </template>
        </el-progress>
      </el-row>
    </el-col>
    <el-col :span="16">
      <h2 class="mb-50">Status messages:</h2>
    </el-col>
  </el-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import FileDragUploader from '@/components/FileDragUploader'

const ext = ['txt', 'rpy']

const store = useStore()

const file1Raw = ref([])
const file2Raw = ref([])

const file1 = computed({
  get: () => store.state.comparable.file2,
  set: (value) => store.dispatch('setFile1', value)
})
const file2 = computed({
  get: () => store.state.comparable.file2,
  set: (value) => store.dispatch('setFile2', value)
})
const currentIndex = computed({
  get: () => store.state.comparable.currentIndex,
  set: (value) => store.commit('setCurrentIndex', value)
})
const currentStatus = computed({
  get: () => store.state.comparable.currentStatus,
  set: (value) => store.commit('setCurrentStatus', value)
})

const currentStatusComputed = computed(() => {
  switch (currentStatus.value) {
    case 'success':
      return {
        text: 'Success',
        color: '#67C23A'
      }
    case 'exception':
      return {
        text: 'Error',
        color: '#F56C6C'
      }
    case 'warning':
      return {
        text: 'Warning',
        color: '#E6A23C'
      }
    default:
      return {
        text: 'Loading',
        color: '#409EFF'
      }
  }
})

const handleFile1Check = () => {
  if (file1Raw.value[0] && !~ext.indexOf(file1Raw.value[0].name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    file1Raw.value = []
  }
}
const handleFile2Check = () => {
  if (file2Raw.value[0] && !~ext.indexOf(file2Raw.value[0].name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    file2Raw.value = []
  }
}

const confirmLoading = () => {
  file1.value = file1Raw.value[0].raw
  file2.value = file2Raw.value[0].raw

  file1Raw.value = []
  file2Raw.value = []
  currentIndex.value = 0
}

const resetState = () => {
  file1Raw.value = []
  file2Raw.value = []
  store.commit('resetState')
}
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
<style>
.uploader .el-upload-dragger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 120px;
}
</style>
