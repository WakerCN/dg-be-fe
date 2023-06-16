<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-12 15:16 周5
 * @Description  : 
-->
<template>
  <component :is="tag" :style="styleProps" class="l-text-component" @click="handleClick">
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { useComponentCommon } from '@/hooks/useComponentCommon'
import { defineComponent } from 'vue'
import { textDefaultProps, textStylePropNames, transfromToComponentProps } from './defaultProps'

defineComponent({
  name: 'l-text'
})

const props = defineProps({
  tag: { type: String, default: 'div' },
  ...transfromToComponentProps(textDefaultProps)
})

const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames)
</script>

<style scoped>
.l-text-component {
  position: relative !important;
}
</style>
