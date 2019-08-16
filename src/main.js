// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 添加图片懒加载
import vuelazyload from 'vue-lazyload'

import '../src/common/font/iconfont.css'

Vue.config.productionTip = false

Vue.use(vuelazyload, {
  loading: require('./common/image/logo@2x.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
