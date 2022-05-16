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
        <el-row align="middle">
          <h2>Yandex.Translate</h2>
          <el-tooltip placement="bottom-end" effect="dark">
            <template #content>
              <h3>Use Yandex translation API to translate your files easily!</h3>
              <h3>Yandex.Cloud console and API-key required.</h3>
            </template>
            <el-button text circle size="large">
              <el-icon><InfoFilled /></el-icon>
            </el-button>
          </el-tooltip>
        </el-row>
      </template>
      <h4 style="margin-bottom: 10px;">API-key:</h4>
      <el-input v-model="key"  size="large" @input="apiKeyHandler" />
      <h4 style="margin: 30px 0 10px;">Translation languages:</h4>
      <el-row justify="space-evenly" align="middle">
        <el-select v-model="sourceLang" placeholder="Source language" class="lang-select">
          <el-option label="English" value="en" />
        </el-select>
        <el-icon><DArrowRight /></el-icon>
        <el-select v-model="targetLang" placeholder="Target language" class="lang-select">
          <el-option label="Russian" value="ru" />
        </el-select>
      </el-row>
      <div v-if="key">
        <el-divider style="margin-bottom: 40px;" />
        <h4 style="margin-bottom: 10px;">Use Yandex.Translate now?</h4>
        <el-switch
          v-model="useTranslation"
          size="large"
          active-text="Yes"
          active-color="#67c23a"
          inactive-text="No"
          inactive-color="#f56c6c"
        />
      </div>
      <template #footer>
        <h3>Powered by <el-link type="primary" href="https://translate.yandex.ru">Yandex.Translator</el-link></h3>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import translate from '@/translate.svg'
import { DArrowRight, InfoFilled } from '@element-plus/icons-vue'
import { yandexNames } from '@/store/modules/yandex'

const store = useStore()

const drawer = ref(false)
const key = computed({
  get: () => store.state.yandex.key,
  set: (value) => store.commit(yandexNames.setKey, value)
})
const sourceLang = computed({
  get: () => store.state.yandex.sourceLang,
  set: (value) => store.commit(yandexNames.setSourceLang, value)
})
const targetLang = computed({
  get: () => store.state.yandex.targetLang,
  set: (value) => store.commit(yandexNames.setTargetLang, value)
})
const useTranslation = computed({
  get: () => store.state.yandex.useTranslation,
  set: (value) => store.commit(yandexNames.setUseTranslation, value)
})

const apiKeyHandler = () => {
  if (!key.value) {
    store.commit(yandexNames.setUseTranslation, false)
  }
}
</script>

<style scoped>
.lang-select {
  width: 40%;
}
</style>
<style>
.el-switch__label--right.is-active {
  color: #67c23a !important;
}
.el-switch__label--left.is-active {
  color: #F56C6C !important;
}
</style>
