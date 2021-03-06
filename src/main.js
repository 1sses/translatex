import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementPlus from '@/plugins/elementPlus'
import { loadFonts } from './plugins/webfontloader'
import color from '@/directives/color'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(elementPlus)
  .directive('color', color)
  .mount('#app')
