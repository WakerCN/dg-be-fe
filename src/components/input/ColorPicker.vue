<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-06-16 15:02 周5
 * @Description  : 基于TDD开发的颜色选择器组件
-->

<template>
  <div class="dg-color-picker">
    <div class="native-color-container">
      <input
        type="color"
        :value="value"
        @input="onChange(($event.target as HTMLInputElement).value)"
      />
    </div>
    <ul class="picked-color-list">
      <li
        v-for="(color, index) in colors"
        :key="index"
        :class="`item-${index}`"
        @click="onChange(color)"
      >
        <div
          v-if="color.startsWith('#')"
          class="color-item"
          :style="{ backgroundColor: color }"
        ></div>
        <div v-else class="color-item transparent-item"></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { defaultColorList } from './const'

defineProps({
  value: { type: String },
  colors: { type: Array as PropType<string[]>, default: defaultColorList }
})

const emits = defineEmits(['change'])

const onChange = (color: string) => {
  emits('change', color)
}
</script>

<style lang="less" scoped>
.dg-color-picker {
  display: flex;
  height: 50px;
  .native-color-container {
    height: 100%;
    margin-right: 10px;
    > input {
      height: 100%;
    }
  }

  .picked-color-list {
    width: 150px;
    flex: 1;
    background: palegoldenrod;
  }
}
</style>
