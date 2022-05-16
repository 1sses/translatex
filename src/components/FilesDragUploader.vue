<template>
  <el-row class="uploader" justify="space-evenly">
    <DragDropUploader
      v-for="uploader in uploaders"
      :key="uploader.text"
      :file-raw="uploader.file"
      :file-loaded="uploader.loaded"
      :tip-text="uploader.text"
      @file-change="$emit(uploader.change, $event)"
    />
  </el-row>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import DragDropUploader from '@/components/DragDropUploader'

const props = defineProps({
  file1Loaded: {
    type: Boolean,
    default: false
  },
  file2Loaded: {
    type: Boolean,
    default: false
  },
  file1Raw: {
    type: Array,
    required: true
  },
  file2Raw: {
    type: Array,
    required: true
  },
  file1Text: {
    type: String,
    default: 'Select main file'
  },
  file2Text: {
    type: String,
    default: 'Select auxiliary file'
  }
})

defineEmits(['enFileChange', 'ruFileChange'])

const uploaders = computed(() => [
  {
    file: props.file1Raw,
    change: 'enFileChange',
    loaded: props.file1Loaded,
    text: props.file1Text
  },
  {
    file: props.file2Raw,
    change: 'ruFileChange',
    loaded: props.file2Loaded,
    text: props.file2Text
  }
])
</script>

<style scoped>

</style>
