<template>
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

const jumpDialog = ref(false)
const jumpNumber = ref(1)

const props = defineProps({
  enFileLength: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['saveWork', 'jumpToLine'])

const saveWork = () => emit('saveWork')
const jumpToLine = () => {
  emit('jumpToLine', jumpNumber.value)
  jumpDialog.value = false
}

const jumpToLineDialogHandler = () => {
  jumpDialog.value = true
}

</script>

<style scoped>

</style>
