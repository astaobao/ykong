import Vue from 'vue'
import App from './App'
import axios from 'axios' // 引入axios,发送请求
import cheerio from 'cheerio' // 引入cheerio,爬虫必备 
import qs from 'qs'


// 引入mint-ui的全部组件 
import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css';  //改为在APP.vue里已cdn的形式引用
Vue.use(Mint);

import phone from 'common/js/quit.js'  //监听手机的返回键

Vue.config.productionTip = false

Vue.prototype.$axios = axios; //Vue.prototype 全局变量,即每个this都可以访问 ,在定义全局变量时很容易和组件定义的值冲突，所有一般习惯在值前面加$
Vue.prototype.$cheerio = cheerio;
Vue.prototype.$qs = qs;



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
