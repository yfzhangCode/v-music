<template>
    <div class="recommend">
        推荐页面
        <button @click="_getdata">getdata</button>
    </div>
</template>
<script>
import { getRecommendData } from '../../api/index.js'
export default {
    data () {
        return {
            Recommenddata: {
                silder: [],
                radioList: [],
                songList: []
            }
        }
    },
    methods: {
        _getdata() {
            getRecommendData().then((res) => {
                console.log(res);
                // this.Recommenddata = 
            })
        }
    }
}
</script>
<style></style>

