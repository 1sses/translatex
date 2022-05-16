<template>
  <el-dialog
    v-model="dialog"
    width="600px"
  >
    <template #title>
      <h2 class="dialog-header">Load files</h2>
    </template>
    <h3>Translatable files:</h3>
    <FilesDragUploader
      :file1-raw="file1Raw"
      :file2-raw="file2Raw"
      :file1-loaded="!!file1"
      :file2-loaded="!!file2"
    />
    <h3>Translate preset: </h3>
    <el-radio-group v-model="preset">
      <el-radio-button v-for="(preset, key) in presets" :label="key" :key="key">{{preset}}</el-radio-button>
    </el-radio-group>
    <template #footer>
      <el-row justify="space-between">
        <div>
          <el-popconfirm title="Are you sure to reset files and preset?" @confirm="resetState">
            <template #reference>
              <el-button circle type="warning"><el-icon><refresh/></el-icon></el-button>
            </template>
          </el-popconfirm>
          <el-popover
            title="Restore"
            :width="200"
            trigger="hover"
            content="Restore translated data from backup"
          >
            <template #reference>
              <el-button circle type="success" @click="restoreBackup"><el-icon><refresh-left /></el-icon></el-button>
            </template>
          </el-popover>
        </div>
        <div>
          <el-button type="danger" @click="dialog = false">Cancel</el-button>
          <el-button type="success" @click="confirmLoading" :disabled="!file1">Confirm</el-button>
        </div>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Refresh, RefreshLeft } from '@element-plus/icons-vue'
import FilesDragUploader from '@/components/FilesDragUploader'
import downloadTextFile from '@/utils/downloadTextFile'
import presets from '@/data/presets'
import { translatableNames } from '@/store/modules/translatable'

const store = useStore()

const file1Raw = ref([])
const file2Raw = ref([])
const preset = ref('none')

const file1 = computed(() => file1Raw.value[0])
const file2 = computed(() => file2Raw.value[0])

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const checkFilesAfterLoading = () => {
  if (store.state.translatable.file1.length === 0) {
    setTimeout(checkFilesAfterLoading, 100)
  } else {
    if (store.state.translatable.file1.length !== store.state.translatable.file2.length &&
      store.state.translatable.file2.length !== 0) {
      ElMessage.error('Files have different length! It may cause an error!')
      file1Raw.value = []
      file2Raw.value = []
      store.commit(translatableNames.resetPrimaryState)
    } else {
      dialog.value = false
    }
  }
}
const confirmLoading = () => {
  store.dispatch(translatableNames.setFile1, file1.value.raw)
  store.dispatch(translatableNames.setFile2, file2.value?.raw)
  store.commit(translatableNames.setPreset, preset.value)
  store.commit(translatableNames.resetSecondaryState)
  checkFilesAfterLoading()
}
const resetState = () => {
  file1Raw.value = []
  file2Raw.value = []
  store.commit(translatableNames.resetState)
}
const restoreBackup = () => {
  const data = JSON.parse(localStorage.getItem('translated') ?? '[]')
  downloadTextFile('restore.txt', data.join('\n').trim())
}
</script>

<style scoped>
.dialog-header {
  margin: 0
}
</style>
<style>
.el-dialog__body {
  padding-top: 0
}
</style>
