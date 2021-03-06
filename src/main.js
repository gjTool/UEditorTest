// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/utf8-jsp/ueditor.config.js'
import '../static/utf8-jsp/ueditor.all.min.js'
import '../static/utf8-jsp/lang/zh-cn/zh-cn.js'
import '../static/utf8-jsp/ueditor.parse.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
