<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-15 14:56 周1
 * @Description  : 画布的包裹组件用于触发事件
-->
<template>
  <div class="editor-wrap" :class="{ active }" @click="onActive(id)">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  id: { type: String, required: true },
  active: { type: Boolean, default: false }
})

const emit = defineEmits(['on-active'])

const onActive = (id: string) => {
  emit('on-active', id)
}
</script>

<style lang="less" scoped>
.editor-wrap {
  padding: 0;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;

  &:hover {
    border: 1px dashed #ccc;
  }
  &.active {
    border: 1px solid #1890ff;
    user-select: none;
    z-index: 1500;
  }
}
</style>
