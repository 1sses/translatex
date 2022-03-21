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
      <h3><span style="color: red">Manual</span> translation mode</h3>
      <h3 v-if="false"><span style="color: green">Automatic</span> translation mode</h3>
      <h4>English line:</h4>
      <el-input class="line-field" v-model="enLine" size="large">
        <template #prepend>{{enLine.length}}</template>
      </el-input>
      <h4>Russian line:</h4>
      <el-input class="line-field" v-model="ruLine" size="large">
        <template #prepend>{{ruLine.length}}</template>
      </el-input>
      <h3>In result:</h3>
      <el-input class="line-field" v-model="resultLine" size="large">
        <template #prepend>{{resultLine.length}}</template>
      </el-input>
    </el-col>

  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Files } from '@element-plus/icons-vue'
import TranslatableFilesDialog from '@/components/TranslatableFilesDialog'

const dialog = ref(false)
const enLine = ref('')
const ruLine = ref('')
const resultLine = ref('')
</script>

<style scoped>
.load-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.line-field {
  font-size: 18px;
}
</style>
