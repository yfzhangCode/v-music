import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters.js'
import * as actions from './actions.js'
import state from './state.js'
import mutations from './mutations.js'
import CreateLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  actions,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [CreateLogger()] : []
})
