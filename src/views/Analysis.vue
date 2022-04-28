<template>
  <el-row>
    <el-col :span="5">
      <h2 class="mb-50">Load file to analyze:</h2>
      <el-row>
        <el-col :push="5">
          <div style="width: min-content;">
            <DragDropUploader :file-raw="fileRaw" :file-loaded="!!fileRaw[0]" tip-text="Select file to analyze" />
          </div>
          <el-row class="mb-50" style="margin-top: 30px;">
            <el-button
              type="success"
              @click="confirmLoading"
              :disabled="!fileRaw[0]"
            >
              Confirm
            </el-button>
            <el-popconfirm title="Are you sure to reset a file?" @confirm="resetState">
              <template #reference>
                <el-button circle type="warning"><el-icon><refresh/></el-icon></el-button>
              </template>
            </el-popconfirm>
          </el-row>
        </el-col>
      </el-row>
      <el-row v-if="file.length">
        <el-col>
          <h2>File information:</h2>
          <h3>Name: <span class="highlighted">{{name}}</span></h3>
          <h3>Length: <span class="highlighted">{{file.length}}</span> line{{file.length > 1 ? 's' : ''}}</h3>
          <h3>Extension: <span class="highlighted">{{extension}}</span></h3>
          <el-divider />
          <h3>Enter-less length: <span class="highlighted">{{enterlessFile.length}}</span></h3>
          <h3>Comment-less length: <span class="highlighted">{{commentlessFile.length}}</span></h3>
          <h3>Intended preset: <span class="highlighted">{{presets[type] ?? 'Unknown'}}</span></h3>
          <h3>System lines:  <span class="highlighted">{{systemLinesCount}}</span></h3>
          <el-divider />
          <h3>Check syntax as:</h3>
          <el-radio-group v-model="type">
            <el-radio-button
            v-for="(name, key) in presets"
            :key="key"
            :label="key === 'none' ? '' : key"
            >
              {{name}}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="18" :push="1">
      <h2>Computed file:</h2>
      <ComputedFileTable :displayed-file="displayedFile" />
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { Refresh } from '@element-plus/icons-vue'
import DragDropUploader from '@/components/DragDropUploader'
import { analyzedNames } from '@/store/modules/analyzed'
import removeComments from '@/algorithms/analyse/removeComments'
import getAssumedFileType from '@/algorithms/analyse/getAssumedFileType'
import getRowType from '@/algorithms/analyse/getRowType'
import presets from '@/data/presets'
import ComputedFileTable from '@/components/ComputedFileTable'

const store = useStore()

const fileRaw = ref([])

const file = computed({
  get: () => store.state.analyzed.file,
  set: (value) => store.dispatch(analyzedNames.setFile, value)
})
const name = computed({
  get: () => store.state.analyzed.name,
  set: (value) => store.commit(analyzedNames.setName, value)
})
const type = computed({
  get: () => store.state.analyzed.type,
  set: (value) => store.commit(analyzedNames.setType, value)
})
const extension = computed(() => name.value.split('.').pop())
const enterlessFile = computed(() => file.value.filter((line) => line.trim()))
const commentlessFile = computed(() => removeComments(enterlessFile.value, type.value))
const systemLinesCount = computed(() => {
  let count = 0
  for (const line of commentlessFile.value) {
    if (getRowType(line, type.value) === 'keyword') {
      count++
    }
  }
  return count
})
const displayedFile = computed(() => file.value.map((line, index) => ({
  line: index + 1,
  text: line
})))

const start = () => {
  type.value = getAssumedFileType(file.value)
}

const confirmLoading = () => {
  file.value = fileRaw.value[0].raw
  fileRaw.value = []
}

const resetState = () => {
  fileRaw.value = []
  store.commit(analyzedNames.resetState)
}

watch(file, () => {
  if (file.value.length) start()
})
</script>

<style scoped>
.mb-50 {
  margin-bottom: 50px;
}
.highlighted {
  font-size: 24px;
  color: #409EFF;
}
</style>
