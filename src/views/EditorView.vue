<template>
  <div class="edit-view">
    <section class="widget-panel">widget</section>
    <section class="main">
      <component v-for="comp in components" :key="comp.id" :is="comp.name" v-bind="comp.props" />
    </section>
    <section class="attr-panel">attr</section>
  </div>
</template>

<!-- 这里没有有setup语法，因为setup语法不方便注册动态组件 -->
<script lang="ts">
import { type GlobalStore } from '@/stores-vuex'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import LText from '@/regist-components/LText.vue'

export default defineComponent({
  components: {
    LText
  },
  setup() {
    const store = useStore<GlobalStore>()
    const components = computed(() => store.state.editor.components)

    return {
      components
    }
  }
})
</script>

<style lang="less" scoped>
.edit-view {
  width: 100%;
  height: 100%;
  background: paleturquoise;
  display: flex;

  .widget-panel {
    width: 240px;
    height: 100%;
    background: papayawhip;
  }

  .main {
    flex: 1;
    width: calc(100% - 240px - 360px);
    height: 100%;
  }

  .attr-panel {
    width: 360px;
    height: 100%;
    background: plum;
  }
}
</style>
