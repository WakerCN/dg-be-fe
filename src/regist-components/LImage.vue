<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-06 10:48 周4
 * @Description  : 
-->
<template>
  <img
    class="l-image"
    title="图片"
    :src="props.src"
    :style="({ ...styleProps, position: 'relative' } as any)"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { transfromToComponentProps, imageStylePropNames, imageDefaultProps } from './defaultProps'
import { useComponentCommon } from '@/hooks/useComponentCommon'
const props = defineProps({
  ...transfromToComponentProps(imageDefaultProps)
})
const { styleProps, handleClick } = useComponentCommon(props, imageStylePropNames)
</script>

<style scoped>
.l-image {
  width: 100%;
  display: block;
}
</style>
