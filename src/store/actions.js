import * as types from './mutations-type' // 定义好的mutation 变量
// 对mutation 的数据改变 的封装
export const seclectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTIDX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
