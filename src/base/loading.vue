<template>
 <div class="loading">
  <img src="../common/image/loading.gif" alt="">
  <p class="loading-tip">{{title}}</p>
 </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载中...'
    }
  }
}
</script>
<style lang="scss">
 .loading{
   width: 100%;
   text-align: center;
  .loading-tip{
   text-align: center;
   font-size: 14px;
   color: #fff;
   line-height: 20px;
  }
 }
</style>

