<template>
  <el-row class="uploader" justify="space-evenly">
    <el-upload
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="1"
      :auto-upload="false"
      :file-list="enFileRaw"
      :om-change="$emit('enFileChange')"
    >
      <el-icon :size="40" :color="enFileLoaded ? '#67C23A' : 'dimgray'">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">Drop file here or<br> <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">
          Select english file
        </div>
      </template>
    </el-upload>
    <el-upload
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="1"
      :auto-upload="false"
      :file-list="ruFileRaw"
      :on-change="$emit('ruFileChange')"
    >
      <el-icon :size="40" :color="ruFileLoaded ? '#67C23A' : 'dimgray'">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text"> Drop file here or<br> <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">
          Select russian file
        </div>
      </template>
    </el-upload>
  </el-row>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'

defineProps({
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
</script>

<style scoped>

</style>
