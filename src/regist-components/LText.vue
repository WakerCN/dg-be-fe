<template>
  <component :is="tag" :style="styleProps" class="l-text-component"> {{ text }} </component>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { computed, defineComponent } from 'vue'
import { textDefaultProps, textStylePropNames, transfromToComponentProps } from './defaultProps'

defineComponent({
  name: 'l-text'
})

const props = defineProps({
  tag: { type: String, default: 'div' },
  ...transfromToComponentProps(textDefaultProps)
})

// 重用与简化
// 抽离并获取styleProps
const styleProps = computed(() => _.pick(props, textStylePropNames))
</script>

<style scoped>
.l-text-component {
  position: relative !important;
}
</style>
