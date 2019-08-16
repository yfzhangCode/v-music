<template>
    <div class="singer">
        <list-view :data="singersList" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>
<script>
import { getSingers } from '../../api/index.js'
import { ERR_OK } from '../../api/config/config.js'
import Singer from '../../common/js/singer.js'
import ListView from '../../base/listview.vue'
import { mapMutations } from 'vuex'

const H_NMAE = '热门'
const H_NMAE_LEN = 10
export default {
  data() {
    return {
      singersList: []
    }
  },
  created() {
    this._getSingers()
  },
  methods: {
    _getSingers() {
      getSingers().then((res) => {
        if (res.code === ERR_OK) {
          this.singersList = this._resizeSinger(res.data.list)
          // console.log(this.singersList)
        }
      })
    },
    _resizeSinger(list) { // 处理获取到的歌手收据
      const map = {
        hot: {
          title: H_NMAE,
          items: []
        }
      }

      list.forEach((item, index) => {
        if (index < H_NMAE_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // console.log(map)
      // 得到有序列表 处理map
      const lists = []
      const hot = []

      for (const i in map) {
        const el = map[i]
        if (el.title.match(/[a-zA-Z]/)) {
          lists.push(el)
        } else if (el.title === H_NMAE) {
          hot.push(el)
        }
      }
      lists.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(lists)
    },
    selectSinger(val) {
      // console.log(val)
      this.$router.push({
        path: `/singer/${val.id}`
      })
      this.setSinger(val)
    },
    ...mapMutations({
      setSinger: 'SET_Singer'
    })
  },
  components: {
    ListView
  }
}
</script>
<style lang="scss">
.singer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
