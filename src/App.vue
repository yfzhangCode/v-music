<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>  <!-- 防止页面闪烁-->
      <router-view></router-view>
    </keep-alive>
    <play></play>
  </div>
</template>

<script>
import MHeader from './components/header/m-header.vue'
import Tab from './components/tab/tab'
import Play from './components/play/play'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Play
  }
}
</script>

<style>
#app {
  color: gray;
  height: 100%;
  overflow: hidden
}
html,body {
  height: 100%;
  background-color: #000;
  -webkit-font-smoothing: antialiased; /*chrome、safari*/
  -moz-osx-font-smoothing: grayscale; /*firefox*/
}
</style>
