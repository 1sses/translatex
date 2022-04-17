<template>
  <el-upload
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    :accept="availableExt.join(',')"
    :limit="1"
    :auto-upload="false"
    :file-list="fileRaw"
    :on-change="$emit('file-change')"
  >
    <el-icon :size="40" :color="fileLoaded ? '#67C23A' : 'dimgray'">
      <upload-filled/>
    </el-icon>
    <div class="el-upload__text">Drop file here or<br> <em>click to upload</em></div>
    <template #tip>
      <div class="el-upload__tip">
        {{ tipText }}
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import availableExt from '@/data/availableExt'
import { ElMessage } from 'element-plus'

const props = defineProps({
  fileRaw: {
    type: Array,
    required: true
  },
  fileLoaded: {
    type: Boolean,
    required: true
  },
  tipText: {
    type: String,
    required: true
  }
})

defineEmits(['file-change'])
</script>

<style>
.uploader .el-upload-dragger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 120px;
}
</style>
