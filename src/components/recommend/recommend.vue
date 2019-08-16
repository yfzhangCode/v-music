<template>
    <section class="recommend">
      <scroll ref="scroll" :data="dataCatList" class="re-scroll">
          <div >
            <div class="slider-content" v-if="slider.length">
                <silder>
                    <div slot="list" v-for="item in slider" :key="item.id">
                        <a :href="item.linkUrl">
                            <img class="needsclick" @load="imgload" :src="item.picUrl">
                        </a>
                    </div>
                </silder>
            </div>
            <!-- 歌单列表 -->
            <div class="recommend-list">
                <div class="recommend">
                    <h3 class="title">热门歌单推荐</h3>
                    <ul class="catory-list">
                      <li v-for="item in dataCatList" :key='item.dissid'>
                        <div class="cat-item-img">
                          <img v-lazy="item.imgurl">
                        </div>
                        <div class="cat-item-detail">
                          <h3 class="cat-title">{{item.dissname}}</h3>
                          <p class="">{{ item.creator.name }}</p>
                          <p class="listennum">{{ item.listennum }} 播放</p>
                        </div>
                      </li>
                    </ul>
                </div>
            </div>
          </div>
      </scroll>
       <!-- loading  -->
        <div class="loading-container" v-show="!dataCatList.length">
            <loading></loading>
        </div>
    </section>
</template>
<script>
import Scroll from '../../base/scroll'
import Silder from '../../base/silder.vue'
import Loading from '../../base/loading.vue'
import { ERR_OK } from '../../api/config/config.js'
import { getRecommend, getCatlist } from '../../api/index.js'

export default {
  data() {
    return {
      slider: [],
      radioList: [],
      songList: [],
      dataCatList: []
    }
  },
  created() {
    this._getdata()
  },
  methods: {
    _getdata() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res)
          this.slider = res.data.slider
          this.radioList = res.data.radioList
          this.songList = res.data.songList
        } else {
          console.log('获取数据失败：' + res)
        }
      })
      // 获取热门歌单推荐数据
      getCatlist().then((res) => {
        // console.log(res)
        this.dataCatList = res.data.list
        // console.log(this.dataCatList)
      }).catch((err) => {
        console.log(err)
      })
    },
    imgload() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  components: {
    Silder,
    Scroll,
    Loading
  }

}
</script>
<style lang="scss">
    // scss 变量
    // @import url('../../common/style/variable.scss');
    // @import url('../../common/style/_mixins.scss');
    // @import url('../../common/style/base.scss');
    .recommend {
      height: 100%;
      overflow: hidden;
      .re-scroll {
        height: 100%;
        position: relative;
        overflow: hidden;
      }
    }
    .recommend-list {
      .title {
          font-size: 14px;
          color: $color-theme;
          text-align: center;
          letter-spacing: 2px;
      }
    }
    .slider-content {
      width: 100%;
      margin-bottom: 20px;
    }
    .catory-list {
      li {
        display: flex;
      }
      .cat-item-img {
        display: flex;
        box-sizing: border-box;
        flex: 0 0 65px;
        width: 65px;
        margin: 20px;
        align-items: center;
        img{
          width: 110%;
        }
      }
      .cat-item-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 20px;
        font-size: 14px;
        .cat-title {
          margin-bottom: 14px;
          font-size: 14px;
          color: $color-text-f0f0f0;
        }
      }

    }
    .loading-container {
      position: absolute;
      width: 100%;
      top:50%;
      transform: translateZ(-50%);
    }
</style>

