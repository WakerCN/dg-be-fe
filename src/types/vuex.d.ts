/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-11 10:55 周4
 * @Description  : 
 */
import { Store } from 'vuex'
import { GlobalStore } from '@/stores-vuex'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<GlobalStore>
  }
}

declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}