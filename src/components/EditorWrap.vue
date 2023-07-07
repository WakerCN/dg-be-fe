<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-15 14:56 周1
 * @Description  : 画布的包裹组件用于触发事件
-->
<template>
  <div class="editor-wrap" @click="onActive(id)">
    <div :class="{ mask: true, active }" />
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
  cursor: pointer;
  user-select: none;
  position: relative;

  &:hover > .mask {
    border: 2px dashed var(--el-color-danger);
  }

  > .mask {
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 2px solid transparent;
    opacity: 0.7;
    .base-transition();

    &.active {
      border: 2px solid var(--el-color-primary);
      user-select: none;
      z-index: 2;
    }
  }
}
</style>
