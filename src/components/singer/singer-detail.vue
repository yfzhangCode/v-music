<template>
  <transition name="sild">
     <music-list :songs="song" :title="title" :bg-singer="bgSinger"></music-list>
  </transition>
</template>

<script>

import { mapGetters } from 'vuex'
import { getSingerDetail, getMusic } from '../../api/index.js'
import { ERR_OK } from '../../api/config/config.js'
import { Createsong } from '../../common/js/song.js'
import musicList from '../musiclist/music-list'
export default {
  data() {
    return {
      song: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgSinger() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
    this._getSingerDetail(this.singer)
  },
  methods: {
    _getSingerDetail(singerdata) {
      if (!this.singer.id) {
        this.$router.push({
          path: '/singer'
        })
        return
      }
      getSingerDetail(singerdata.id).then((res) => {
        if (ERR_OK === res.code) {
          console.log(res.data)
          this.song = this._normalizeSingerdata(res.data.list)
          console.log(this.song)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _normalizeSingerdata(list) {
      const ret = []
      list.forEach((item) => {
        const musicdata = item.musicData
        if (musicdata.songid && musicdata.albummid) {
          getMusic(musicdata.songmid).then((res) => {
            console.log(res)
            if (res.code === ERR_OK) {
              const svkey = res.data.items
              const songkey = svkey[0].vkey
              console.log(songkey)
              if (!songkey) {
                this.$router.push({
                  path: '/singer'
                })
              } else {
                ret.push(Createsong(musicdata, songkey))
                console.log(ret)
              }
            }
          })
        }
      })
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>

<style lang="scss">
  .sild-enter-active, .sild-leave-active {
    transition: all 0.3s
  }
  .sild-enter, .sild-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
