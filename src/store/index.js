import Vue from 'vue'
import Vuex from 'vuex'
import staffStore from './module/staffStore'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    staffStore
  }
})
