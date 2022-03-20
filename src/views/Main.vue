<template>
  <el-container>
    <el-button
      class="load-button"
      circle size="large"
      type="info"
      @click="dialog = true"
    >
      <el-icon><plus /></el-icon>
    </el-button>
    <el-dialog
      v-model="dialog"
      width="600px"
    >
      <template #title>
        <h2 class="dialog-header">Load files</h2>
      </template>
      <h3>Translatable files:</h3>
      <el-row class="uploader" justify="space-evenly">
        <el-upload
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :auto-upload="false"
          :file-list="enFileRaw"
          :on-change="handleEnFileCheck"
        >
          <el-icon :size="40" :color="enFile ? '#67C23A' : ''"><upload-filled /></el-icon>
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
          :on-change="handleRuFileCheck"
        >
          <el-icon :size="40" :color="ruFile ? '#67C23A' : ''"><upload-filled /></el-icon>
          <div class="el-upload__text"> Drop file here or<br> <em>click to upload</em></div>
          <template #tip>
            <div class="el-upload__tip">
              Select russian file
            </div>
          </template>
        </el-upload>
      </el-row>
      <h3>Translate preset: </h3>
      <el-radio-group v-model="preset">
        <el-radio-button label="renpy">RenPy</el-radio-button>
        <el-radio-button label="none">None</el-radio-button>
      </el-radio-group>
      <template #footer>
      <span>
        <el-button type="danger" @click="dialog = false">Cancel</el-button>
        <el-button type="success" @click="confirmLoading" :disabled="!enFile">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import { ElMessage } from 'element-plus'
import { Plus, UploadFilled } from '@element-plus/icons-vue'

const ext = ['txt']

export default {
  name: 'Main',
  components: { Plus, UploadFilled },
  data () {
    return {
      dialog: false,
      preset: 'none',
      enFileRaw: [],
      ruFileRaw: []
    }
  },
  computed: {
    enFile () {
      return this.enFileRaw[0]
    },
    ruFile () {
      return this.ruFileRaw[0]
    }
  },
  methods: {
    handleEnFileCheck (file) {
      if (!~ext.indexOf(file.name.split('.').pop())) {
        ElMessage.warning('Not allowed file format')
        this.enFileRaw = []
      }
    },
    handleRuFileCheck (file) {
      if (!~ext.indexOf(file.name.split('.').pop())) {
        ElMessage.warning('Not allowed file format')
        this.ruFileRaw = []
      }
    },
    confirmLoading () {
      this.$store.dispatch('setEn', this.enFile.raw)
      this.$store.dispatch('setRu', this.ruFile?.raw)
      this.$store.dispatch('setPreset', this.preset)
      // store.dispatch('setEn', this.enFile.raw)
      // store.dispatch('setRu', this.ruFile?.raw)
      // store.dispatch('setPreset', this.preset)

      this.dialog = false
    }
  }
}
</script>

<style>
.load-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.dialog-header {
  margin: 0
}

.el-dialog__body {
  padding-top: 0
}

.uploader .el-upload-dragger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 100px;
}

.mt-local {
  margin-top: 20px;
}
</style>
