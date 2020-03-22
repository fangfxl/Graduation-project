import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Print from 'vue-print-nb'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  

export const eventBus = new Vue()

Vue.use(VueQuillEditor)
Vue.use(Print);
Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.prototype.$http=Axios


Vue.prototype.$http = axios.create({ //创建一个axios实例，同时指定接口和地址是什么
  baseURL: 'http://localhost:3000/api' //后端接口的根地址，这样做我就可以在任意vue页面用this.$http访问到axios实例
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
