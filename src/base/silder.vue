<template>
    <div class="silder" ref="silder">
        <div class="silder-list" ref="sliderList">
            <slot name="list"></slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{active: currentPageIndex === index}"  v-for="(item,index) in dots" :key="index"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '../common/js/dom.js'
export default {
  name: 'silder',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSilderWith()
      this._setdot()
      this._initSilder()
      if (this.autoplay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.silder) {
        return
      }
      this._setSilderWith(true)
      this.silder.refresh()
    })
  },
  created() {

  },
  methods: {
    _setSilderWith(resize) {
      this.children = this.$refs.sliderList.children

      let width = 0
      const silderWidth = this.$refs.silder.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = silderWidth + 'px'
        width += silderWidth
      }
      //   无缝循环 克隆添加图片
      if (this.loop && !resize) {
        width += 2 * silderWidth
      }
      //   设置总宽度
      this.$refs.sliderList.style.width = width + 'px'
    },
    _initSilder() {
      this.silder = new BScroll(this.$refs.silder, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        bounce: false,
        stopPropagation: true,
        click: true
      })

      this.silder.on('scrollEnd', () => {
        const pageIndex = this.silder.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoplay) {
          this._play()
        }
      })
    },
    _setdot() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this.timer)
      //   const pageIndex = this.currentPageIndex
      //   console.log(pageIndex)
      this.timer = setTimeout(() => {
        this.silder.next(400)// 低版本使用 this.silder.goToPage(pageIndex - 1, 0, 400)
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss">
@import "../common/style/variable.scss";
.silder {
    position: relative;
    overflow: hidden;
}
.silder-list {
    white-space: nowrap;
    overflow: hidden;
}
.slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    a {
        display:block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
        img {
            width: 100%;
            display: block;
        }
    }
}
.dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll
        }

    }
}

</style>

