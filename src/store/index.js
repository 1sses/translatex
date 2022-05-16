import { createStore } from 'vuex'
import translatable from '@/store/modules/translatable'
import comparable from '@/store/modules/comparable'
import analyzed from '@/store/modules/analyzed'
import yandex from '@/store/modules/yandex'

export default createStore({
  modules: {
    translatable,
    comparable,
    analyzed,
    yandex
  }
})
