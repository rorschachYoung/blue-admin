import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin'
import './assets/css/reset.css'
import './assets/css/common.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.mixin({
  /* 用来upload 组件的上传添加header */
  methods:{
    getAuthHeader(){
      return {
        Authorization:"Bearer " + (window.localStorage.token || '')
      }
    }
  }
})
Vue.use(ElementUI,{size:'small'})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
