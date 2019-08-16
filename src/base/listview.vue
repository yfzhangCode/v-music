<template>
  <div class="list-view">
   <scroll
      @scroll="scroll"
      :data="data"
      ref="listView"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      >
     <ul class="list-group">
      <li v-for="item in data" :key="item.title" ref="listGroup">
        <h2 class="singer-title">{{ item.title }}</h2>
        <ul>
         <li @click="selectItem(val)" v-for="val in item.items" :key="val.id" class="list-detail">
          <img v-lazy="val.avatar" class="singer-avatar">
          <span class="singer-name">{{ val.name }}</span>
         </li>
        </ul>
      </li>
     </ul>
     <!-- 快速入口 -->

     <div class="fastsinger"
      @touchstart.stop.prevent="On_Fastsinger"
      @touchmove.stop.prevent="On_touchMove"
      @touchend.stop>
       <ul>
         <li v-for="(item, index) in fastsinger"
          :key="index"
          :data-index="index"
          class="item"
          :class="{current: currentidx === index}"
          >{{item}}</li>
       </ul>
     </div>

     <div class="fixed-title" v-if="fixedtitle">
       <h2 class="singer-title">{{ fixedtitle }}</h2>
     </div>
   </scroll>

  </div>
</template>
<script>
import Scroll from './scroll.vue'
import { getEleIndex } from '../common/js/dom.js'
const listHeight = 18
export default {
  data() {
    return {
      scrollY: -1,
      currentidx: 0
    }
  },
  created() {
    this.probeType = 3
    this.touch = {}
    this.listenScroll = true
    this.listheigth = []
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    fastsinger() {
      return this.data.map((list) => {
        return list.title.substr(0, 1)
      })
    },
    fixedtitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentidx] ? this.data[this.currentidx].title : ''
      // this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(val) {
      this.$emit('select', val)
    },
    On_Fastsinger(e) {
      // 获取当前点击元素的索引值
      // console.log(e)
      const currentIndex = getEleIndex(e.target, 'index')
      const currentTarget = e.touches[0]
      this.touch.y1 = currentTarget.pageY
      this.touch.touchstartIndex = currentIndex
      // console.log(this.touch.touchstartIndex)
      this.scrollTo(currentIndex)
    },
    On_touchMove(e) {
      const currentTarget = e.touches[0]
      this.touch.y2 = currentTarget.pageY
      // 计算touchmove 的距离
      const touchMoveDis = (this.touch.y2 - this.touch.y1) / listHeight
      // console.log(touchMoveDis)
      // 滚动了几个锚点
      // console.log(this.touch.touchstartIndex)
      const touchEndIndex = Math.floor(parseInt(this.touch.touchstartIndex) + touchMoveDis)
      // console.log(touchEndIndex)
      this.scrollTo(touchEndIndex)
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos) {
      console.log(pos)
      this.scrollY = pos.y
    },
    _CalculateHeight() {
      this.listheigth = []
      const listEl = this.$refs.listGroup
      console.log(listEl)

      let height = 0
      this.listheigth.push(height)
      for (let i = 0; i < listEl.length; i++) {
        const listHeight = listEl[i]
        height += listHeight.clientHeight
        this.listheigth.push(height)
      }
      console.log(this.listheigth)
    },
    scrollTo(currentIndex) {
      if (currentIndex < 0 || currentIndex === null || isNaN(currentIndex)) {
        return
      }
      console.log(currentIndex)
      if (currentIndex === 0) {
        currentIndex = 0
      } else if (currentIndex >= this.listheigth.length - 2) {
        currentIndex = this.listheigth.length - 2
      }
      this.scrollY = -this.listheigth[currentIndex]
      console.log(this.scrollY)
      this.$refs.listView.scrollToElement(this.$refs.listGroup[currentIndex], 20)
    }

  },
  components: {
    Scroll
  },
  watch: {
    data() {
      setTimeout(() => {
        this._CalculateHeight()
      }, 20)
    },
    scrollY(newY) {
      console.log(newY)
      if (newY === 0) {
        this.currentIndex = 0
        this.currentidx = 0
        return
      }
      const listheight = this.listheigth
      for (let i = 0; i < listheight.length; i++) {
        const height1 = listheight[i]
        const height2 = listheight[i + 1]
        if (!height2 || (-newY >= height1 && -newY < height2)) {
          this.currentidx = i
          console.log(this.currentidx)
          return
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '../common/style/variable.scss';
 .list-view {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .singer-title {
     font-weight: normal;
     font-size: 14px;
     background-color: $color-highlight-background;
     text-indent: 20px;
     color: $color-text-f0f0f0;
     height: 30px;
     line-height: 30px;
     border-radius: 2px
    }
    .scroll {
     height: 100%;
     width: 100%;
    }
    .list-detail {
     display: flex;
     align-items: center;
     padding: 20px 0 30px 0;
     .singer-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 25px;
     }
     .singer-name {
      margin-left: 20px;
      color: $color-text-l;
      font-size: $font-size-medium
     }
    }
    .fastsinger {
      right: 0;
      position: absolute;
      top: 45%;
      transform: translateY(-50%);
      padding: 0 10px 0 0;
      ul {
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
        .item {
          list-style: none;
          padding: 3px;
          line-height: 1;
          color: $color-text-l;
          font-size: $font-size-small;
          &.current{
            color: $color-theme
          }

        }
      }
    }
    .fixed-title {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
 }
</style>

