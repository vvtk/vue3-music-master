import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/base.scss'
import '@/assets/theme.scss'
import router from './router'
import "@/utils/extend"
import VueLazyload from 'vue-lazyload'
import App from './App.vue'



const app = createApp(App)

import loading from '@/assets/img/loading3.png';

// 安装插件，挂载app
app.use(createPinia()).use(router).use(VueLazyload,{
    loading: loading,//正在加载的图片路径(可以使用变量存储)
    // attempt: 1
  }).mount('#app')


