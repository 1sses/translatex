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
  enFileLoaded: {
    type: Boolean,
    default: false
  },
  ruFileLoaded: {
    type: Boolean,
    default: false
  },
  enFileRaw: {
    type: Array,
    required: true
  },
  ruFileRaw: {
    type: Array,
    required: true
  }
})

defineEmits(['enFileChange', 'ruFileChange'])

const uploaders = computed(() => [
  {
    file: props.enFileRaw,
    change: 'enFileChange',
    loaded: props.enFileLoaded,
    text: 'Select main file'
  },
  {
    file: props.ruFileRaw,
    change: 'ruFileChange',
    loaded: props.ruFileLoaded,
    text: 'Select auxiliary file'
  }
])
</script>

<style scoped>

</style>
