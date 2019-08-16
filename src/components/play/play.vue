<template>
 <div class="player" v-show="playlist.length>0">
   <transition name="normal">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back" @click="miniPlayer">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h1 class="subtitle" v-html="currentSong.singer"></h1>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd" :class="rotated">
              <img class="img" :src="currentSong.image">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
              <i class="iconfont icon-icon-sequence"></i>
          </div>
          <div class="icon i-left">
            <i class="i-prev iconfont icon-Previoustrack"></i>
          </div>
          <div class="icon i-center" @click="togglePlay">
            <i class="icon-play iconfont icon-play" :class="playIcon"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next iconfont icon-Nexttrack"></i>
          </div>
          <div class="icon i-right">
            <i class="icon icon-not-favorite iconfont icon-favorites"></i>
          </div>
        </div>
      </div>
    </div>
   </transition>
   <transition name="mini">
    <div class="mini-player" @click="openfull" v-show="!fullScreen">
      <div class="icon" :class="rotated">
        <img width="40" height="40" :src="currentSong.image">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control" @click.stop="togglePlay">
        <i class="iconfont" :class="playIcon"></i>
      </div>
      <div class="control">
        <i class="iconplaylist iconfont icon-24gl-playlistMusic"></i>
      </div>
    </div>
   </transition>
   <audio ref="audio" :src="currentSong.url" loop></audio>
 </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
export default {
  created() {
    console.log(this.currentSong)
  },
  methods: {
    miniPlayer() {
      this.setFullscreen(false)
    },
    openfull() {
      this.setFullscreen(true)
    },
    togglePlay() {
      this.setPlayingstate(!this.playing)
    },
    ...mapMutations({
      setFullscreen: 'SET_FULLSCREEN',
      setPlayingstate: 'SET_PLAYING_STATE'
    })

  },
  computed: {
    rotated() {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing'
    ])
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newplaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newplaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.player {
 .normal-player {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $color-background;
  z-index: 150;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
  }
  .top {
    position: relative;
    margin-bottom: 25px;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 50;
      .icon-fanhui {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
    }
    .title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      @include no-wrap;
      font-size: $font-size-large;
      color: $color-text;
    }
    .subtitle {
      line-height: 20px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
  .middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0;
    .middle-l {
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
        .cd {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 10px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          .img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .play {
          animation: cdmove 20s linear infinite
        }
        .pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 50px;
    width: 100%;
    .operators {
      display: flex;
      align-items: center;
      .icon {
        flex: 1;
        color: $color-theme;
        i {
          font-size: 30px;
        }

      }
      .i-left {
        text-align: right;
      }
      .i-center {
        text-align: center;
      }
      .i-right {
        text-align: left;
      }
      .icon-favorite {
        color: $color-sub-theme
      }
    }
  }

 }
 .normal-enter-active,
  .normal-leave-active {
    transition: all 0.4s;
    .top,
    .bottom {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  .normal-enter,
  .normal-leave-to {
    opacity: 0;
    .top {
      transform: translate3d(0, -100px, 0)
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
 .mini-player {
  width: 100%;
  line-height: 40px;
  background: rgb(0,0,0);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 180;
  height: 60px;
  display: flex;
  align-items: center;

  .icon{
    flex: 0 0 40px;
    width: 40px;
    padding: 0 10px 0 20px;
    img {
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      @include no-wrap;
      font-size: $font-size-medium;
      color: $color-text;
    }
    .desc {
      @include no-wrap;
      font-size: $font-size-small;
      color: $color-text-d;
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    i {
      font-size: 30px;
      color: $color-theme;
    }
    .iconplaylist {
      font-size: 30px;
      color: $color-theme;
    }
  }
  .play {
    animation: cdmove 20s linear infinite
  }
  .pause {
    animation-play-state: paused;
  }
 }
  .mini-enter-leave,
  .mini-leave-active{
    transition: all .4s;
  }
  .mini-enter, .mini-leave-to {
    opacity: 0;
  }
}
@keyframes cdmove {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
}

</style>

