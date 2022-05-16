<template>
  <el-row>
    <el-button type="primary" :icon="Download" :disabled="!enFileLength" @click="saveDialog = true">Save work</el-button>
    <el-button type="primary" :icon="EditPen" :disabled="!enFileLength" @click="jumpDialog = true">Continue from line</el-button>
    <el-dialog
      v-model="saveDialog"
      width="500px"
    >
      <template #title>
        <h2 class="dialog-header">Save work</h2>
      </template>
      <h3>Enter file's name:</h3>
      <el-input
        v-model="fileName"
        placeholder="Please input file name"
        class="input-with-select"
      >
        <template #append>
          <el-select v-model="fileExtSelect" placeholder="ext" style="width: 70px">
            <el-option label=".txt" value=".txt" />
            <el-option label=".rpy" value=".rpy" />
          </el-select>
        </template>
      </el-input>
      <el-row class="warnings">
        <el-col>
          <h3 v-if="(workEnded || notEndedAction) && fileName" v-color="'green'">Everything's ok, ready to save!</h3>
          <h3 v-else style="color: red">Having conflicts with saving!</h3>
          <ul>
            <li v-if="!fileName">Define file's name to save!</li>
            <li v-if="!workEnded">Work isn't ended!<br> Define action to do with translated part:
              <el-radio-group v-model="notEndedAction" class="radio-buttons" style="margin-top: 10px;">
                <el-radio label="split">Divide the translated and untranslated parts<br>
                  into different files</el-radio>
                <el-radio label="save">Just save translated part to file</el-radio>
              </el-radio-group>
            </li>
          </ul>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="saveDialog = false">Close</el-button>
          <el-button type="primary" @click="saveWork">Save</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="jumpDialog"
      width="400px"
    >
      <template #title>
        <h2 class="dialog-header">Continue work from line</h2>
      </template>
      <el-input-number v-model="jumpNumber" :min="1" :max="enFileLength - 1" />
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="jumpDialog = false">Cancel</el-button>
              <el-button type="primary" @click="jumpToLine">Confirm</el-button>
            </span>
      </template>
    </el-dialog>
  </el-row>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Download, EditPen } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const jumpDialog = ref(false)
const jumpNumber = ref(1)
const saveDialog = ref(false)
const fileName = ref('')
const fileExtSelect = ref('.txt')
const notEndedAction = ref('')

const props = defineProps({
  enFileLength: {
    type: Number,
    required: true
  },
  workEnded: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['saveWork', 'jumpToLine'])

const saveWork = () => {
  if (!fileName.value) {
    ElMessage.error('File name is required!')
    return
  }
  const filename = fileName.value + fileExtSelect.value
  if (props.workEnded) {
    emit('saveWork', false, filename)
  } else {
    if (notEndedAction.value === 'split') {
      emit('saveWork', true, filename)
    } else if (notEndedAction.value === 'save') {
      emit('saveWork', false, filename)
    } else {
      ElMessage.error('Specify translated part action!')
    }
  }
}
const jumpToLine = () => {
  emit('jumpToLine', jumpNumber.value)
  jumpDialog.value = false
}
</script>

<style scoped>
.warnings {
  margin-top: 20px;
}

li {
  margin-top: 5px;
}

.radio-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
