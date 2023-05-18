import './assets/main.less'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { vuexStore } from './stores-vuex'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)

app.use(vuexStore)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
