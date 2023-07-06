<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-15 11:35 周1
 * @Description  : 
-->
<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <LText v-bind="item" />
    </div>
    <div class="component-item" @click="$event.stopPropagation()">
      <StyledUploader ref="styleUploadRef" @onsuccess="onImageUpload" />
    </div>
  </div>
</template>

<script lang="ts">
import LText from '@/regist-components/LText.vue'
import type { TextComponentProps } from '@/regist-components/defaultProps'
import { imageDefaultProps } from '@/regist-components/defaultProps'
import type { ComponentData } from '@/stores-vuex/editor'
import _ from 'lodash'
import { v4 } from 'uuid'
import { defineComponent, type PropType } from 'vue'
import type { UploadResp } from '../types/extra'
import StyledUploader from './input/StyledUploader.vue'
import { getImageSize } from '@/helpers/image'

export default defineComponent({
  name: 'component-list',
  components: {
    LText,
    StyledUploader
  },
  props: {
    list: {
      type: Array as PropType<Array<TextComponentProps>>,
      required: true
    }
  },
  emits: ['on-item-click'],
  setup(props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        name: 'l-text',
        id: v4(),
        props: _.cloneDeep(props)
      }
      context.emit('on-item-click', componentData)
    }

    const onImageUpload = (resp: UploadResp) => {
      const componentData: ComponentData = {
        name: 'l-image',
        id: v4(),
        props: {
          ...imageDefaultProps
        }
      }
      componentData.props.src = resp.data.url
      getImageSize(componentData.props.src).then(({ width }) => {
        const maxWith = 400
        componentData.props.width = (width > maxWith ? maxWith : width) + 'px'
        context.emit('on-item-click', componentData)
      })
    }

    return { onItemClick, onImageUpload }
  }
})
</script>

<style lang="less" scoped>
.create-component-list {
  .component-item {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: var(--el-color-info-light-9);
    }
  }
}
</style>
