<template>
  <div>
    <el-button type="primary" @click="drawer = true" size="large" text bg>
      <el-image :src="translate" />
    </el-button>
    <el-drawer
      v-model="drawer"
      direction="rtl"
    >
      <template #title>
        <h2>Yandex.Translate</h2>
      </template>
      <h3>Use Yandex translation API to translate your files!</h3>
      <h3>Yandex.Cloud console and API-key required.</h3>
      <template #footer>
        <h3>Powered by <el-link type="primary" href="https://translate.yandex.ru">Yandex.Translator</el-link></h3>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import translate from '@/translate.svg'

const drawer = ref(false)
const key = ref(localStorage.getItem('yandex-translate-api-key') || '')
</script>

<style scoped>
h3 a {
  text-decoration: none;
  color: #409EFF;
}
</style>
