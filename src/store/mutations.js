// 在这里面写需要修改的数据
// 引入设置的常量

import * as types from './mutations-type.js'
const mutations = {
  [types.SET_Singer](state, singer) {
    state.Singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCELIST](state, list) {
    state.sequencelist = list
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENTIDX](state, index) {
    state.currentIdx = index
  }
}

export default mutations
