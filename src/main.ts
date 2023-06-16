/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-09 11:04 周2
 * @Description  : 
 */
import './assets/main.less'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { vuexStore } from './stores-vuex'
import ColorPicker from '@/components/input/ColorPicker.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)

app.use(vuexStore)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('color-picker', ColorPicker)

app.mount('#app')
