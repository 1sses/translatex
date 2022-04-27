import { createStore } from 'vuex'
import translatable from '@/store/modules/translatable'
import comparable from '@/store/modules/comparable'
import analyzed from '@/store/modules/analyzed'

export default createStore({
  modules: {
    translatable,
    comparable,
    analyzed
  }
})
