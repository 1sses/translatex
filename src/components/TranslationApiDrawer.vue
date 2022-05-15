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
      <h3>Use Yandex translation API to translate your files easily!</h3>
      <h3>Yandex.Cloud console and API-key required.</h3>
      <el-divider style="margin-bottom: 40px;" />
      <h4 style="margin-bottom: 10px;">API-key:</h4>
      <el-input v-model="key"  size="large" @input="apiKeyChange" />
      <h4 style="margin: 30px 0 10px;">Translation languages:</h4>
      <el-row justify="space-evenly" align="middle">
        <el-select v-model="sourceLang" placeholder="Source language" class="lang-select" @change="sourceLangChange">
          <el-option label="English" value="en" />
        </el-select>
        <el-icon><DArrowRight /></el-icon>
        <el-select v-model="targetLang" placeholder="Target language" class="lang-select" @change="targetLangChange">
          <el-option label="Russian" value="ru" />
        </el-select>
      </el-row>
      <template #footer>
        <h3>Powered by <el-link type="primary" href="https://translate.yandex.ru">Yandex.Translator</el-link></h3>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import translate from '@/translate.svg'
import { DArrowRight } from '@element-plus/icons-vue'

const drawer = ref(false)
const key = ref(localStorage.getItem('yandex-translate-api-key') || '')
const sourceLang = ref(localStorage.getItem('yandex-translate-source-lang') || '')
const targetLang = ref(localStorage.getItem('yandex-translate-target-lang') || '')

const apiKeyChange = () => {
  localStorage.setItem('yandex-translate-api-key', key.value)
}
const sourceLangChange = () => {
  localStorage.setItem('yandex-translate-source-lang', sourceLang.value)
}
const targetLangChange = () => {
  localStorage.setItem('yandex-translate-target-lang', targetLang.value)
}
</script>

<style scoped>
.lang-select {
  width: 40%;
}
</style>
