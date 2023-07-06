/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-09 11:04 周2
 * @Description  :
 */
import { fileURLToPath, URL } from 'node:url'

import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueDevTools(), vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import url('@/assets/main.less');`
      }
    }
  }
})
