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
      <el-row v-for="input in [['English', currentEnLine], ['Russian', currentRuLine]]" :key="input[0]">
        <h3>{{input[0]}} line:</h3>
        <el-input class="line-field" :model-value="input[1]" size="large" disabled>
          <template #prepend>{{input[1].length}}</template>
          <template #append>
            <el-button :icon="Aim" style="margin-bottom: 4px;" @click="setResult(input[1])" />
          </template>
        </el-input>
      </el-row>
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
      <GlobalTranslateControls
        :en-file-length="enFile.length"
        :work-ended="currentIndex === enFile.length"
        @save-work="saveWork"
        @jump-to-line="jumpToLine"
      />
      <LastTranslatedTable :latest-lines="latestLines" />
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
import presets from '@/data/presets'

const dialog = ref(false)
const resultedLine = ref('')

const translatedData = ref([])
const bufferTranslatedData = ref([])

const store = useStore()

const enFile = computed(() => store.state.translatable.en)
const ruFile = computed(() => store.state.translatable.ru)
const preset = computed(() => store.state.translatable.preset)
const currentIndex = computed({
  get: () => store.state.translatable.currentIndex,
  set: (value) => store.commit('setCurrentIndex', value)
})

const currentEnLine = computed(() => enFile.value[currentIndex.value] ?? '')
const currentRuLine = computed(() => ruFile.value[currentIndex.value] ?? '')
const latestLines = computed(() => translatedData.value.slice(-10))

watch(currentRuLine, () => {
  // fix problems, cause lots of bugs!
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

const saveWork = (shouldSplitFiles, filename) => {
  console.log('save work', shouldSplitFiles, filename)
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
</style>
<style>
.el-input.is-disabled .el-input__inner {
  background-color: white;
  color: #606266;
  cursor: crosshair;
}
</style>
