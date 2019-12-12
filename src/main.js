import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http=Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
