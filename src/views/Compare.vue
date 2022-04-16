<template>
  <el-container>
    <el-col :span="8">
      <h2 class="mb-50">Load files to compare:</h2>
      <FileDragUploader
        :en-file-raw="file1Raw"
        :ru-file-raw="file2Raw"
        :en-file-loaded="!!file1"
        :ru-file-loaded="!!file2"
        @enFileChange="handleFile1Check"
        @ruFileChange="handleFile2Check"
      />
      <el-row justify="center" style="margin-top: 30px;">
        <el-button type="success" @click="confirmLoading" :disabled="!file1 || !file2">Confirm</el-button>
        <el-popconfirm title="Are you sure to reset files?" @confirm="resetState">
          <template #reference>
            <el-button circle type="warning"><el-icon><refresh/></el-icon></el-button>
          </template>
        </el-popconfirm>
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
  get: () => file1Raw.value[0],
  set: (value) => store.dispatch('setFile1', value)
})
const file2 = computed({
  get: () => file2Raw.value[0],
  set: (value) => store.dispatch('setFile2', value)
})
const currentIndex = computed({
  get: () => store.state.currentIndex,
  set: (value) => store.commit('setCurrentIndex', value)
})

const handleFile1Check = () => {
  if (file1.value && !~ext.indexOf(file1.value.name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    file1Raw.value = []
  }
}
const handleFile2Check = () => {
  if (file2.value && !~ext.indexOf(file2.value.name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    file2Raw.value = []
  }
}

const confirmLoading = () => {
  file1.value = file1.value.raw
  file2.value = file2.value.raw
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
