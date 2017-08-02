import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import 'common/js/rem.js'
import store from './store'
import 'common/less/icon.less'
Vue.config.productionTip = false
Vue.use(lazyload, {
  loading: require('common/images/0.jpg')
})
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
