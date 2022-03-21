<template>
  <el-dialog
    v-model="dialog"
    width="600px"
  >
    <template #title>
      <h2 class="dialog-header">Load files</h2>
    </template>
    <h3>Translatable files:</h3>
    <el-row class="uploader" justify="space-evenly">
      <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :auto-upload="false"
        :file-list="filesState.enFileRaw"
        :on-change="handleEnFileCheck"
      >
        <el-icon :size="40" :color="enFile ? '#67C23A' : ''">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">Drop file here or<br> <em>click to upload</em></div>
        <template #tip>
          <div class="el-upload__tip">
            Select english file
          </div>
        </template>
      </el-upload>
      <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :auto-upload="false"
        :file-list="filesState.ruFileRaw"
        :on-change="handleRuFileCheck"
      >
        <el-icon :size="40" :color="ruFile ? '#67C23A' : ''">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text"> Drop file here or<br> <em>click to upload</em></div>
        <template #tip>
          <div class="el-upload__tip">
            Select russian file
          </div>
        </template>
      </el-upload>
    </el-row>
    <h3>Translate preset: </h3>
    <el-radio-group v-model="filesState.preset">
      <el-radio-button label="renpy">RenPy</el-radio-button>
      <el-radio-button label="none">None</el-radio-button>
    </el-radio-group>
    <template #footer>
      <el-row justify="space-between">
        <el-popconfirm title="Are you sure to reset files and preset?" @confirm="resetState">
          <template #reference>
            <el-button circle type="warning"><el-icon><refresh/></el-icon></el-button>
          </template>
        </el-popconfirm>
        <div>
          <el-button type="danger" @click="dialog = false">Cancel</el-button>
          <el-button type="success" @click="confirmLoading" :disabled="!enFile">Confirm</el-button>
        </div>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Refresh, UploadFilled } from '@element-plus/icons-vue'

const ext = ['txt']

const filesState = reactive({
  enFileRaw: [],
  ruFileRaw: [],
  preset: 'none'
})

const store = useStore()

const enFile = computed(() => filesState.enFileRaw[0])
const ruFile = computed(() => filesState.ruFileRaw[0])

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

const handleEnFileCheck = (file) => {
  if (!~ext.indexOf(file.name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    filesState.enFileRaw = []
  }
}
const handleRuFileCheck = (file) => {
  if (!~ext.indexOf(file.name.split('.').pop())) {
    ElMessage.warning('Not allowed file format')
    filesState.ruFileRaw = []
  }
}
const checkFilesAfterLoading = () => {
  if (store.getters.en.length === 0) {
    setTimeout(checkFilesAfterLoading, 100)
  } else {
    if (store.getters.en.length !== store.getters.ru.length && store.getters.ru.length !== 0) {
      ElMessage.error('Files have different length! It may cause an error!')
      filesState.enFileRaw = []
      filesState.ruFileRaw = []
    } else {
      dialog.value = false
    }
  }
}
const confirmLoading = () => {
  store.dispatch('setEn', enFile.value.raw)
  store.dispatch('setRu', ruFile.value?.raw)
  store.dispatch('setPreset', filesState.preset)
  checkFilesAfterLoading()
}
const resetState = () => {
  filesState.enFileRaw = []
  filesState.ruFileRaw = []
  filesState.preset = 'none'
  store.commit('resetEn')
  store.commit('resetRu')
  store.commit('resetPreset')
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
