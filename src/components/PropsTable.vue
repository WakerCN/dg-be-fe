<template>
  <div class="props-table">
    <div class="prop-item" v-for="(value, key) in finalProps" :key="key">
      <div class="label">{{ value?.label }}</div>
      <div class="input">
        <component
          v-if="value"
          :is="value?.component"
          :[value.valueProps]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
        >
          <template v-if="value.subComponent && value.options">
            <component
              :is="value.subComponent"
              v-for="(option, key) in value.options"
              :key="key"
              :label="
                value.subComponentProps?.labelTransform
                  ? value.subComponentProps.labelTransform(option.value)
                  : option.label
              "
              :value="option.value"
            >
              <RenderVNode :vNode="option.label" />
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RenderVNode from '@/components/RenderVNode'
import type { TextComponentProps } from '@/regist-components/defaultProps'
import { mapPropsToForms } from '@/regist-components/propsMap'
import _ from 'lodash'
import { computed, defineProps, type PropType, type VNode } from 'vue'

interface FormProps {
  /** 属性对应的表单组件 */
  component: string
  /** 表单对应的标签 */
  label?: string
  /** 组件的额外属性 */
  extraProps?: { [key: string]: any }
  /** 子组件 */
  subComponent?: string
  /** 子组件自定义属性 */
  subComponentProps?: { [key: string]: any }
  /** 子组件选项 */
  options?: { label: string | VNode; value: any }[]
  /** 事件名称 */
  eventName: string
  events: { [key: string]: (e: any) => void }
  /** 值属性名称 */
  valueProps: string
  value: string
}

const props = defineProps({
  props: { type: Object as PropType<Partial<TextComponentProps>>, required: true }
})

const emits = defineEmits(['change'])

const finalProps = computed(() => {
  return _.reduce(
    props.props,
    (result, value, key) => {
      const newKey = key as keyof TextComponentProps
      const item = mapPropsToForms[newKey]
      if (item) {
        const {
          valueProps = 'modelValue',
          eventName = 'change',
          initalTransform,
          afterTransform
        } = item
        const newItem: FormProps = {
          ...item,
          value: initalTransform ? initalTransform(value) : value,
          valueProps,
          eventName,
          events: {
            [eventName]: (e: any) => {
              emits('change', { key, value: afterTransform ? afterTransform(e) : e })
            }
          }
        }
        result[newKey] = newItem
      }
      return result
    },
    {} as { [key: string]: FormProps }
  )
})
console.log('%c 🍐 finalProps', 'font-size:16px;color:#ffffff;background:#ff7979', finalProps)
</script>

<style lang="less" scoped>
.props-table {
  padding: 10px;
  .prop-item {
    display: flex;
    margin-bottom: 10px;

    .label {
      width: 120px;
    }

    .input {
      width: calc(100% - 120px);
    }
  }
}
</style>
