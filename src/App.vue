<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/header/m-header.vue'
import Tab from './components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style>
#app {
  color: gray;
}
html,body {
  height: 100%;
  background-color: #000;
}
</style>
