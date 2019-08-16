export const singer = state => state.Singer // 歌手和歌曲信息 vuex 获取

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequencelist = state => state.sequencelist

export const mode = state => state.mode

export const currentIdx = state => state.currentIdx

export const currentSong = (state) => {
  return state.playlist[state.currentIdx] || {}
}
