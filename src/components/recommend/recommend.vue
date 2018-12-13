<template>
    <section class="recommend">
        <div class="slider-content">
            <silder>
                <div slot="list" v-for="item in slider" :key="item.id">
                    <a :href="item.linkUrl">
                        <img :src="item.picUrl">
                    </a>
                </div>
            </silder>
        </div>
        <div class="recommend-list">
            <div class="recommend">
                <h3 class="title">热门歌单推荐</h3>
            </div>
        </div>   
    </section>
</template>
<script>
import Silder from '../../base/silder.vue'
import { ERR_OK } from '../../api/config/config.js'
import { getRecommendData } from '../../api/index.js'

export default {
    data() { 
        return {
            slider: [],
            radioList: [],
            songList: []
        }
    },
    created() {
        this._getdata();
    },
    methods: {
        _getdata() {
            getRecommendData().then((res) => {
                if(res.data.code == ERR_OK) {
                    console.log(res);
                    this.slider = res.data.data.slider;
                    this.radioList = res.data.data.radioList;
                    this.songList = res.data.data.songList;
                } else {
                    console.log("获取数据失败：" + res);
                }
            })
        }
    },
    components: {
        Silder
    }

}
</script>
<style lang="scss">
    // scss 变量
    // @import url('../../common/style/variable.scss');
    // @import url('../../common/style/_mixins.scss');
    // @import url('../../common/style/base.scss');
    .recommend-list {
      .title {
          font-size: 14px;
          color: $color-theme;
          text-align: center;
          letter-spacing: 2px;
      }  
    }
</style>

