<template>
  <el-container>
    <el-button
      class="load-button"
      circle
      size="large"
      type="info"
      @click="dialog = true"
    >
      <el-icon :size="20">
        <files/>
      </el-icon>
    </el-button>
    <TranslatableFilesDialog v-model="dialog" />
    <el-col>
      <h3>English line:</h3>
      <el-input class="line-field" :model-value="currentEnLine" size="large" disabled>
        <template #prepend>{{currentEnLine.length}}</template>
        <template #append>
          <el-button :icon="Aim" style="margin-bottom: 4px;" @click="setResult(currentEnLine)" />
        </template>
      </el-input>
      <h3>Russian line:</h3>
      <el-input class="line-field" :model-value="currentRuLine" size="large" disabled>
        <template #prepend>{{currentRuLine.length}}</template>
        <template #append>
          <el-button :icon="Aim" style="margin-bottom: 4px;" @click="setResult(currentRuLine)" />
        </template>
      </el-input>
      <h2>In result:</h2>
      <el-input class="line-field" v-model="resultedLine" size="large">
        <template #prepend>{{resultedLine.length}}</template>
      </el-input>
      <el-row class="controls">
        <el-button
          size="large"
          :disabled="!enFile.length || currentIndex === enFile.length"
          @click="confirmLine"
        >Confirm line
        </el-button>
        <el-button-group size="large">
          <el-button :icon="ArrowLeft" :disabled="currentIndex === 0" @click="backHandler" />
          <el-button :icon="ArrowRight" :disabled="!bufferTranslatedData.length" @click="forwardHandler" />
        </el-button-group>
      </el-row>
      <el-row class="stats">
        <el-col>
          <h3>Lines done: {{currentIndex}}/{{enFile.length}}</h3>
          <h3 v-if="enFile.length">
            Mode:
            <span :style="{color: ruFile.length ? 'green' : 'red'}">
              {{ruFile.length ? 'automatic' : 'manual'}}
            </span>
          </h3>
          <h3>Preset: <span style="color: #409eff">{{presets[preset]}}</span></h3>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" :icon="Download" @click="saveWork">Save work</el-button>
        <el-button type="primary" :icon="EditPen" @click="jumpToLineDialogHandler">Continue from line</el-button>
        <el-dialog
          v-model="jumpDialog"
          width="400px"
        >
          <template #title>
            <h2 class="dialog-header">Continue work from line</h2>
          </template>
          <el-input-number v-model="jumpNumber" :min="1" :max="enFile.length - 1" />
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="jumpDialog = false">Cancel</el-button>
              <el-button type="primary" @click="jumpToLine">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </el-row>
      <el-row>
        <h2>Last translated:</h2>
        <el-table :data="latestLines">
          <el-table-column prop="line" label="Number" width="100" />
          <el-table-column prop="text" label="Text" />
        </el-table>
      </el-row>
    </el-col>
  </el-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { Files, ArrowLeft, ArrowRight, Aim, Download, EditPen } from '@element-plus/icons-vue'
import TranslatableFilesDialog from '@/components/TranslatableFilesDialog'
import presets from '@/data/presets'
import { ElMessage } from 'element-plus'

const dialog = ref(false)
const jumpDialog = ref(false)
const jumpNumber = ref(1)
const currentIndex = ref(0)
const resultedLine = ref('')

const translatedData = ref([])
const bufferTranslatedData = ref([])

const store = useStore()

const enFile = computed(() => store.getters.en)
const ruFile = computed(() => store.getters.ru)
const preset = computed(() => store.getters.preset)

const currentEnLine = computed(() => enFile.value[currentIndex.value] ?? '')
const currentRuLine = computed(() => ruFile.value[currentIndex.value] ?? '')
const latestLines = computed(() => translatedData.value.slice(-10))

watch(currentRuLine, () => {
  if (bufferTranslatedData.value.length) return
  // here is logic for translating
  resultedLine.value = currentRuLine.value
})

const setResult = (value) => {
  resultedLine.value = value
}

const backHandler = () => {
  const lastLine = translatedData.value.pop()
  bufferTranslatedData.value.push(lastLine)
  currentIndex.value--
  resultedLine.value = lastLine.text
}

const forwardHandler = () => {
  const nextLine = bufferTranslatedData.value.pop()
  translatedData.value.push(nextLine)
  currentIndex.value++
  resultedLine.value = nextLine.text
}

const confirmLine = () => {
  translatedData.value.push({
    line: currentIndex.value,
    text: resultedLine.value
  })
  bufferTranslatedData.value.pop()
  resultedLine.value = ''
  currentIndex.value++
}

const saveWork = () => {
  console.log('save work')
}

const jumpToLineDialogHandler = () => {
  jumpDialog.value = true
}

const jumpToLine = () => {
  console.log('jump to line', jumpNumber.value)
  if (!enFile.value.length) {
    ElMessage.error('You have to load English file first')
    return
  }
  if (jumpNumber.value > enFile.value.length) {
    ElMessage.error('Line number is too big')
    return
  }
  if (jumpNumber.value < currentIndex.value) {
    ElMessage.error('Line number is less than current line')
    return
  }
  currentIndex.value = jumpNumber.value
  jumpDialog.value = false
}
</script>

<style scoped>
.load-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10;
}

.line-field {
  font-size: 18px;
}

.stats {
  margin-top: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-top: 40px;
}
</style>
<style>
.el-input.is-disabled .el-input__inner {
  background-color: white;
  color: #606266;
}
</style>
