import { Store } from 'vuex'
import { GlobalStore } from '@/stores-vuex'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<GlobalStore>
  }
}
