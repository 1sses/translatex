<template>
  <el-dialog
    v-model="dialog"
    width="600px"
  >
    <template #title>
      <h2 class="dialog-header">Load files</h2>
    </template>
    <h3>Translatable files:</h3>
    <FileDragUploader
      :en-file-raw="enFileRaw"
      :ru-file-raw="ruFileRaw"
      :en-file-loaded="!!enFile"
      :ru-file-loaded="!!ruFile"
      @enFileChange="handleEnFileCheck"
      @ruFileChange="handleRuFileCheck"
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
          <el-button type="success" @click="confirmLoading" :disabled="!enFile">Confirm</el-button>
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
import FileDragUploader from '@/components/FileDragUploader'
import presets from '@/data/presets'

const ext = ['txt', 'rpy']

const store = useStore()

const enFileRaw = ref([])
const ruFileRaw = ref([])
const preset = ref('none')

const enFile = computed(() => enFileRaw.value[0])
const ruFile = computed(() => ruFileRaw.value[0])

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const handleEnFileCheck = () => {
  if (enFile.value && !~ext.indexOf(enFile.value.name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    enFileRaw.value = []
  }
}
const handleRuFileCheck = () => {
  if (ruFile.value && !~ext.indexOf(ruFile.value.name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    ruFileRaw.value = []
  }
}
const checkFilesAfterLoading = () => {
  if (store.state.translatable.en.length === 0) {
    setTimeout(checkFilesAfterLoading, 100)
  } else {
    if (store.state.translatable.en.length !== store.state.translatable.ru.length &&
      store.state.translatable.ru.length !== 0) {
      ElMessage.error('Files have different length! It may cause an error!')
      enFileRaw.value = []
      ruFileRaw.value = []
      store.commit('resetEn')
      store.commit('resetRu')
    } else {
      dialog.value = false
    }
  }
}
const confirmLoading = () => {
  store.dispatch('setEn', enFile.value.raw)
  store.dispatch('setRu', ruFile.value?.raw)
  store.commit('setPreset', preset.value)
  store.commit('setCurrentIndex', 0)
  store.commit('setTranslatedData', [])
  store.commit('setBufferTranslatedData', [])
  checkFilesAfterLoading()
}
const resetState = () => {
  enFileRaw.value = []
  ruFileRaw.value = []
  preset.value = 'none'
  store.commit('resetEn')
  store.commit('resetRu')
  store.commit('resetPreset')
  store.commit('resetCurrentIndex')
  store.commit('resetTranslatedData')
  store.commit('resetBufferTranslatedData')
}
const restoreBackup = () => {
  const data = JSON.parse(localStorage.getItem('translated') ?? '[]')
  const a = document.createElement('a')
  a.download = 'restore.txt'
  const file = new Blob(
    [data.join('\n').trim()],
    { type: 'text/plain' }
  )
  a.href = URL.createObjectURL(file)
  a.click()
}
</script>

<style scoped>
.dialog-header {
  margin: 0
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

.el-dialog__body {
  padding-top: 0
}
</style>
