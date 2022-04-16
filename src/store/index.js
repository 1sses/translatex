import { createStore } from 'vuex'
import translatable from '@/store/modules/translatable'
import comparable from '@/store/modules/comparable'

export default createStore({
  modules: {
    translatable,
    comparable
  }
})
