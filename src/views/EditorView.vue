<template>
  <div class="edit-view">
    <section class="widget-panel">
      <ComponentList :list="templateList" @on-item-click="addItem" />
    </section>
    <section class="main">
      <EditorWrap
        v-for="comp in components"
        :key="comp.id"
        :id="comp.id"
        @on-active="onActive(comp.id)"
        :active="comp.id === currentElement?.id"
      >
        <component :is="comp.name" v-bind="comp.props" />
      </EditorWrap>
    </section>
    <section class="attr-panel">
      <PropsTable v-if="currentElement && currentElement.props" :props="currentElement.props" />
      <pre>
        {{ currentElement?.props }}
      </pre>
    </section>
  </div>
</template>

<!-- 这里没有有setup语法，因为setup语法不方便注册动态组件 -->
<script lang="ts">
import ComponentList from '@/components/ComponentList.vue'
import EditorWrap from '@/components/EditorWrap.vue'
import PropsTable from '@/components/PropsTable.vue'
import { defaultTemplates } from '@/components/defaultTemplates'
import LText from '@/regist-components/LText.vue'
import { type GlobalStore } from '@/stores-vuex'
import type { ComponentData } from '@/stores-vuex/editor'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    LText,
    ComponentList,
    EditorWrap,
    PropsTable
  },
  setup() {
    const store = useStore<GlobalStore>()
    const components = computed(() => store.state.editor.components)
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentComponentProps
    )

    const addItem = (props: any) => {
      store.commit('addComponent', props)
    }

    /** 激活画布组件 */
    const onActive = (id: string) => {
      store.commit('onActiveCompoent', id)
    }

    return {
      components,
      templateList: defaultTemplates,
      addItem,
      onActive,
      currentElement
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
