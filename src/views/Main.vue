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
    <TranslatableFilesDialog v-model="dialog"/>
    <el-col>
      <h3>Main line:</h3>
      <el-input class="line-field" :model-value="currentEnLine" size="large" readonly>
        <template #prepend>{{ currentEnLine.length }}</template>
        <template #append>
          <el-button circle text :icon="Aim" class="mb-3" @click="setResult(currentEnLine)"/>
        </template>
      </el-input>
      <el-row v-if="ruFile.length">
        <h3>Auxiliary line:</h3>
        <el-input class="line-field" :model-value="currentRuLine" size="large" readonly>
          <template #prepend>{{ currentRuLine.length }}</template>
          <template #append>
            <el-button circle text :icon="Aim" class="mb-3" @click="setResult(currentRuLine)"/>
          </template>
        </el-input>
      </el-row>
      <h2>In result:</h2>
      <el-input class="line-field" v-model="resultedLine" size="large" @keydown.enter="confirmLine">
        <template #prepend>{{ resultedLine.length }}</template>
      </el-input>
      <el-row class="controls">
        <el-button
          size="large"
          :disabled="!enFile.length || currentIndex >= enFile.length"
          @click="confirmLine"
        >
          Confirm line
        </el-button>
        <el-button-group size="large">
          <el-button :icon="ArrowLeft" :disabled="currentIndex === 0" @click="backHandler"/>
          <el-button :icon="ArrowRight" :disabled="!bufferTranslatedData.length" @click="forwardHandler"/>
        </el-button-group>
      </el-row>
      <el-row class="stats">
        <el-col>
          <h3>Lines done: {{ currentIndex }}/{{ enFile.length }}</h3>
          <h3 v-if="enFile.length">
            Mode:
            <span :style="{color: mode.color}">
              {{ mode.text }}
            </span>
          </h3>
          <h3>Preset: <span style="color: #409eff">{{ presets[preset] }}</span></h3>
        </el-col>
      </el-row>
      <GlobalTranslateControls
        :en-file-length="enFile.length"
        :work-ended="currentIndex === enFile.length"
        @save-work="saveWork"
        @jump-to-line="jumpToLine"
      />
      <LastTranslatedTable :latest-lines="latestLines"/>
    </el-col>
  </el-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Files, ArrowLeft, ArrowRight, Aim } from '@element-plus/icons-vue'
import TranslatableFilesDialog from '@/components/TranslatableFilesDialog'
import GlobalTranslateControls from '@/components/GlobalTranslateControls'
import LastTranslatedTable from '@/components/LastTranslatedTable'
import getLocalstorageSize from '@/utils/getLocalstorageSize'
import downloadTextFile from '@/utils/downloadTextFile'
import presets from '@/data/presets'
import { translatableNames } from '@/store/modules/translatable'
import getCurrentLine from '@/algorithms/translate/getCurrentLine'

const dialog = ref(false)
const resultedLine = ref('')

const store = useStore()

const enFile = computed(() => store.state.translatable.en)
const ruFile = computed(() => store.state.translatable.ru)
const preset = computed(() => store.state.translatable.preset)
const currentIndex = computed({
  get: () => store.state.translatable.currentIndex,
  set: (value) => store.commit(translatableNames.setCurrentIndex, value)
})
const translatedData = computed({
  get: () => store.state.translatable.translatedData,
  set: (value) => store.commit(translatableNames.setTranslatedData, value)
})
const bufferTranslatedData = computed({
  get: () => store.state.translatable.bufferTranslatedData,
  set: (value) => store.commit(translatableNames.setBufferTranslatedData, value)
})

const currentEnLine = computed(() => enFile.value[currentIndex.value] ?? '')
const currentRuLine = computed(() => ruFile.value[currentIndex.value] ?? '')
const latestLines = computed(() => translatedData.value.slice(-10))
const mode = computed(() => {
  if (store.state.yandex.useTranslation) return { text: 'AI', color: '#67c23a' }
  else if (ruFile.value.length) return { text: 'Automatic', color: '#e6a23c' }
  else return { text: 'Manual', color: '#f56c6c' }
})

watch(currentEnLine, () => {
  if (bufferTranslatedData.value.length) {
    resultedLine.value = bufferTranslatedData.value.at(-1).text
  } else {
    resultedLine.value = getCurrentLine(
      currentEnLine.value,
      currentRuLine.value,
      preset.value,
      mode.value.text,
      store.state.yandex)
  }
})

watch(currentIndex, () => {
  if (currentIndex.value % 10 === 0) {
    localStorage.setItem('translated', JSON.stringify(translatedData.value.map(({ text }) => text)))
    if (getLocalstorageSize() > 1e6) {
      ElMessage.warning('The backup storage is full, save the work to avoid problems')
    }
  }
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
  if (currentIndex.value >= enFile.value.length) return
  translatedData.value.push({
    line: currentIndex.value,
    text: resultedLine.value
  })
  bufferTranslatedData.value.pop()
  resultedLine.value = ''
  currentIndex.value++
}

const saveWork = (shouldSplitFiles, filename) => {
  downloadTextFile(
    filename,
    translatedData.value.map(({ text }) => text).join('\n').trim()
  )
  if (shouldSplitFiles) {
    const fileExt = `.${filename.split('.').pop()}`
    downloadTextFile(
      filename.replace(fileExt, '_rest_en' + fileExt),
      enFile.value.slice(currentIndex.value).join('\n').trim()
    )
    downloadTextFile(
      filename.replace(fileExt, '_rest_ru' + fileExt),
      ruFile.value.slice(currentIndex.value).join('\n').trim()
    )
  }
}

const jumpToLine = (line) => {
  if (!enFile.value.length) {
    ElMessage.error('You have to load English file first')
    return
  }
  if (line < currentIndex.value) {
    ElMessage.error('Line number is less than current line')
    return
  }
  currentIndex.value = line
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

.mb-3 {
  margin-bottom: 3px;
}
</style>
