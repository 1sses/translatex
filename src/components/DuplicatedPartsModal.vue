<template>
  <div>
    <el-button type="success" plain @click="dialog = true">
      Duplicated parts
    </el-button>
    <el-dialog
      v-model="dialog"
      width="1400px"
    >
      <template #title>
        <h2 class="dialog-header">Duplicated parts</h2>
        <h4>Preset: {{ presets[intendedPreset] ?? 'Unknown' }}</h4>
      </template>
      <div
        v-for="table in [
          [restParts, 'Main parts', showRestParts],
          [fullSystemParts, 'Full system parts', showFullSystemParts]
        ]"
        :key="table[1]"
      >
        <h3>
          <el-switch :model-value="table[2]" @change="switchChangeHandler(table[1])"/>
          <span>&nbsp;{{ table[1] }}:</span>
        </h3>
        <el-table v-if="table[2]" :data="table[0]" max-height="400">
          <el-table-column prop="indexes" label="Indexes" width="140">
            <template #default="scope">
              <p v-for="(index, i) in scope.row.indexes" :key="i" class="table-line-element">
                {{ index["1"] }} &lt;=&gt; {{ index["2"] }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="lines" label="Lines">
            <template #default="scope">
              <p v-for="(line, i) in scope.row.lines" :key="i" class="table-line-element">
                {{ line }}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <el-row justify="end">
          <el-button @click="dialog = false">Close</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch, watchEffect } from 'vue'
import presets from '@/data/presets'
import getRowType from '@/algorithms/analyse/getRowType'

const props = defineProps({
  duplicatedParts: {
    type: Array,
    required: true
  },
  intendedPreset: {
    type: String,
    required: true
  }
})

const dialog = ref(false)
const showRestParts = ref(true)
const showFullSystemParts = ref(false)

const fullSystemParts = computed(() =>
  props.duplicatedParts.filter(part => part.lines.every(line => getRowType(line, props.intendedPreset) === 'system')))
const restParts = computed(() =>
  props.duplicatedParts.filter(part => !part.lines.every(line => getRowType(line, props.intendedPreset) === 'system')))

const switchChangeHandler = (tableHeader) => {
  console.log(tableHeader)
  if (tableHeader === 'Main parts') {
    showRestParts.value = !showRestParts.value
  } else if (tableHeader === 'Full system parts') {
    showFullSystemParts.value = !showFullSystemParts.value
  }
}
</script>

<style scoped>
.dialog-header {
  font-size: 30px;
  margin: 0
}

h3 {
  font-size: 22px;
}

.table-line-element {
  margin: 0;
}
</style>
<style>
.el-dialog__body {
  padding-top: 0
}
</style>
