import type { TextComponentProps } from '@/regist-components/defaultProps'
import { mapPropsToForms } from '@/regist-components/propsMap'
import _ from 'lodash'
import { computed, defineComponent, type PropType, type VNode } from 'vue'
import {
  ElInput,
  ElInputNumber,
  ElSlider,
  ElRadioGroup,
  ElRadioButton,
  ElSelect,
  ElOption
} from 'element-plus'
import ColorPicker from '@/components/input/ColorPicker.vue'

const mapToComponent = {
  'el-input': ElInput,
  'el-input-number': ElInputNumber,
  'el-slider': ElSlider,
  'el-radio-group': ElRadioGroup,
  'el-radio-button': ElRadioButton,
  'el-select': ElSelect,
  'el-option': ElOption,
  'color-picker': ColorPicker
} as any

interface FormProps {
  /** 属性对应的表单组件 */
  component: string
  /** 表单对应的标签 */
  label?: string
  /** 组件的额外属性 */
  extraProps?: { [key: string]: any }
  /** 子组件 */
  subComponent?: string
  /** 子组件选项 */
  options?: { label: string | VNode; value: any }[]
  /** 事件名称 */
  eventName: string
  events: { [key: string]: (e: any) => void }
  /** 值属性名称 */
  valueProps: string
  value: string
}

function catializeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default defineComponent({
  name: 'props-table',
  props: {
    props: { type: Object as PropType<Partial<TextComponentProps>>, required: true }
  },
  emits: ['change'],
  setup(props, context) {
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
                ['on' + catializeFirstLetter(eventName)]: (e: any) => {
                  context.emit('change', { key, value: afterTransform ? afterTransform(e) : e })
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

    return () => (
      <div class="props-table">
        {Object.keys(finalProps.value).map((key) => {
          const value = finalProps.value[key]
          const ComponentName = mapToComponent[value.component]
          const SubComponent = value.subComponent ? mapToComponent[value.subComponent] : null
          const props = {
            [value.valueProps]: value.value,
            ...value.extraProps,
            ...value.events
          }

          return (
            <div key={key} class={'prop-item'}>
              {value.label && <div class={'label'}>{value.label}</div>}
              <div class={'input'}>
                <ComponentName {...props}>
                  {value.options &&
                    value.options.map((option) => {
                      return <SubComponent value={option.value}>{option.label}</SubComponent>
                    })}
                </ComponentName>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
})
