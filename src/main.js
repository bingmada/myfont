import '@/styles/index.scss' // global css
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import '@/permission' // permission control
import '@/icons'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import AnimatedVue from 'animated-vue'
// const AnimatedVue = require('animated-vue')

Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// Vue.use(AnimatedVue)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
