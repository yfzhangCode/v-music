// 引入配置文件
import { playMode } from '../common/js/config'

// 定义需要的变量
const state = {
  Singer: {},
  playing: false, // 播放中
  fullScreen: false, // 全屏展开
  playlist: [], // 播放列表
  sequencelist: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式
  currentIdx: -1
}

export default state
