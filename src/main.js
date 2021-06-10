/*
 * @Author: wangshengxian
 * @Date: 2020-12-28 13:06:32
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-07 15:58:28
 * @Desc: main - 入口文件
 */
import '@/utils/polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// normalize
import 'normalize.css/normalize.css'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import '@/assets/styles/index.less'
// icon
import './assets/icons'
// beforeEach、afterEach
import '@/utils/routerGuards'
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

// Vue.use(VueVideoPlayer)

Vue.use(ElementUI, { size: 'medium', zIndex: 1000 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
