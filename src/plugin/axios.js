import axios from 'axios'
import Vue from 'vue'
import router from '../router'
axios.defaults.baseURL = 'http://www.rorscloud.top:4000'
axios.interceptors.request.use(function (config) {
    if(localStorage.token){
        config.headers.Authorization = "Bearer " + window.localStorage.token 
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
axios.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    return res;
  }, function (err) {
    /* 状态码 >= 400 */
    /* err.name : Error  */
    /* err.response : axios的响应对象  */
    console.log(err.response)
    if(err.response.status === 401){
        /* 未登录授权的 跳转登录*/
        router.push('/login')
    }
    Vue.prototype.$message.error(err.response.data.err || err.response.data.msg || '出现错误了' )
    return Promise.reject(err);
  });
Vue.prototype.axios = axios
