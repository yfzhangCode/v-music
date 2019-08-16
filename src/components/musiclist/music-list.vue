<template>
 <div class="music-list">
  <div class="musiclist-top">
   <div class="top-header bg-Singer" :style="bgStyle" ref="bgSinger">
    <span class="back-icon iconfont icon-fanhui" @click="back"></span>
    <h2 class="song-name" v-html="title"></h2>
    <div class="bgwrapper" v-show="songs.length>0">
      <div class="paly">
        <i class="iconfont icon-play"></i>
        <span>随机播放全部</span>
      </div>
    </div>
   </div>
  </div>
    <div class="bg-layer" ref="layer"></div>
   <!-- 滚动的歌曲数据 -->
   <scroll :data="songs" class="list" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" ref="list">
     <div class="song-list-wrapper">
       <song-list @select="selectItem" :songs="songs"></song-list>
     </div>
   </scroll>

 </div>
</template>
<script>

import Scroll from '../../base/scroll'
import SongList from '../../base/song-list'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      probeType: 3,
      listenScroll: true,
      scrollY: ''
    }
  },
  created() {
  },
  props: {
    bgSinger: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgSinger.clientHeight
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgSinger})`
    }
  },
  methods: {
    scroll(pos) {
      console.log(pos)
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    },
    selectItem(item, index) {
      this.seclectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'seclectPlay'
    ])
  },
  components: {
    Scroll,
    SongList
  },
  watch: {
    scrollY(newY) {
      this.$refs.layer.style['transform'] = `translate3d(0, ${newY}px, 0)`
    }
  }
}
</script>
<style lang="scss">
.music-list {
 position: fixed;
 z-index: 100;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: $color-background;
 .top-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
   .back-icon {
    position: absolute;
    top: 0;
    left: 5px;
    z-index: 50;
    padding: 10px;
    display: block;
    font-size: $font-size-medium-x;
    color: $color-theme;
   }
   .song-name {
    font-size: $font-size-large;
    color: $color-text-f0f0f0;
    text-align: center;
    font-weight: normal;
    padding: 5px 0;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
   }
 }
 .bgwrapper {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    border: 1px solid yellow;
    border-radius: 20px;
    color: yellow;
    font-size: 16px;
    .icon-play {
      margin-right: 5px;
      font: 18px sans-serif;
    }
 }
 .bg-layer {
   position: relative;
   height: 100%;
   background: $color-background;
 }
 .list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $color-background;
  overflow: visible;
  .song-list-wrapper {
   box-sizing: border-box;
  }
 }
}
</style>
