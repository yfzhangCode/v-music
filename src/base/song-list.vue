<template>
 <div class="song-list">
  <ul>
   <li class="song-item" @click="selectItem(item, index)" v-for="(item, index) in songs" :key="item.name">
    <div class="song-content">
      <span class="song-name">{{item.name}}</span>
      <span class="song-desc">{{getDesc(item)}}</span>
    </div>
   </li>
  </ul>
 </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} ● ${song.album}`
    },
    selectItem(item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>
<style lang="scss">
.song-list {
 width: 100%;
 padding-top: 10px;
 .song-item{
  padding-left: 15px;
  margin: 16px 0;
  line-height: 30px;
  box-sizing: border-box;
  .song-content {
   .song-name,
   .song-desc {
    display: block;
   }
   .song-name {
    color: $color-text-f0f0f0;
   }
  }
 }
}
</style>

