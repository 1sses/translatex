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
<!--      <h2><span style="color: red">Manual</span> translation mode</h2>-->
<!--      <h2 v-if="false"><span style="color: green">Automatic</span> translation mode</h2>-->
      <h3>English line:</h3>
      <el-input class="line-field" :model-value="currentEnLine" size="large" disabled>
        <template #prepend>{{currentEnLine.length}}</template>
      </el-input>
      <h3>Russian line:</h3>
      <el-input class="line-field" :model-value="currentRuLine" size="large" disabled>
        <template #prepend>{{currentRuLine.length}}</template>
      </el-input>
      <h2>In result:</h2>
      <el-input class="line-field" v-model="resultedLine" size="large">
        <template #prepend>{{resultedLine.length}}</template>
      </el-input>
      <el-row class="controls">
        <el-button size="large" @click="confirmLine" :disabled="enFile.length === 0">Confirm line</el-button>
        <el-button-group size="large">
          <el-button :icon="ArrowLeft" :disabled="currentIndex === 0" />
          <el-button :icon="ArrowRight" :disabled="false" />
        </el-button-group>
      </el-row>
      <el-row class="stats">
        <h2>Lines done: {{currentIndex}}/{{enFile.length}}</h2>
      </el-row>
      <el-row class="table">
        <h2>Last translated:</h2>
        <el-table :data="tableData">
          <el-table-column prop="line" label="Number" width="100" />
          <el-table-column prop="text" label="Text" />
        </el-table>
      </el-row>
    </el-col>
  </el-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Files, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import TranslatableFilesDialog from '@/components/TranslatableFilesDialog'
import { useStore } from 'vuex'

const tableData = [
  { line: 1, text: 'Hello' },
  { line: 2, text: 'World this is my harboro jhsdf ksjdksj hbdfjs bfkjs dfbsdbjs ckjhlasjkas kjhs hk sbsd bd bksb ds dkjbks ds adhfhsdfh' },
  { line: 33, text: 'dhcsjkdh kjh kjldhgjkd fhgjksdfh kjhsdfjk ghkjdhgdhsfhds hd sjkdhf kjdh k kjjk sjkdfhjdskfhkjasd hkasdhfk j sdhhasd hksd s sdfsk jfhsjkdhf kjsdhfkh asdkjfh jkhsdafjkhjkasdh kfjhasd kjfhsdkahfkj hdfhasdhfh kjsdhf kjhfh hfk hsdkf hkjsdhfkjlasdhfjkh kjsdafjkh kjsdhkfhjkasdhf sdjkfhskjhfkjasdhf kjsdhfka' }
]

const dialog = ref(false)

const currentIndex = ref(0)

const store = useStore()

const enFile = computed(() => store.getters.en)
const ruFile = computed(() => store.getters.ru)
const preset = computed(() => store.getters.preset)

const currentEnLine = computed(() => enFile.value[currentIndex.value] ?? '')
const currentRuLine = computed(() => ruFile.value[currentIndex.value] ?? '')

const resultedLine = ref('')
watch(currentRuLine, () => {
  // here is logic for translating
  console.log('updating resulted line: ', currentRuLine.value)
  resultedLine.value = currentRuLine.value
})

const confirmLine = () => {
  resultedLine.value = ''
  currentIndex.value++
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

.controls {
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-top: 40px;
}

.table {
  margin-top: 40px;
}
</style>
<style>
.el-input.is-disabled .el-input__inner {
  background-color: white;
  color: #606266;
}
</style>
