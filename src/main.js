import Vue from 'vue'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/components/ps-element-ui' // 全局注册自定义组件

import App from './App'
import store from './store'
import router from './router'

// import iView from 'iview'
// import 'iview/dist/styles/iview.css' // 使用 CSS

// import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
// Vue.use(ViewUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
