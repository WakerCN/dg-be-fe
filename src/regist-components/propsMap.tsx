/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-15 15:53 周1
 * @Description  :
 */
import { type VNode } from 'vue'
import type { TextComponentProps } from './defaultProps'

export interface PropToForm {
  /** 属性对应的表单组件 */
  component: string
  /** 初始转化值 */
  initalTransform?: (value: any) => any
  afterTransform?: (value: any) => any
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
  eventName?: string
  /** 值属性名称 */
  valueProps?: string
}

export type PropToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

const fontFamilyArr = [
  { label: '无', value: '' },
  { label: '宋体', value: '"SimSun", "STSong"' },
  { label: '黑体', value: '"SimHei", "STHeiti"' },
  { label: '楷体', value: '"KaiTi", "STKaiti"' },
  { label: '仿宋', value: '"FangSong", "STFangsong"' }
]

const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    label: <span style={{ fontFamily: font.value }}>{font.label}</span>
  }
})

export const mapPropsToForms: PropToForms = {
  text: {
    label: '文本',
    component: 'el-input',
    extraProps: {
      type: 'textarea',
      row: 2,
      autosize: { minRows: 2, maxRows: 4 }
    },
    eventName: 'input'
  },
  fontSize: {
    label: '字号',
    component: 'el-input-number',
    initalTransform: (value: string) => Number(value.replace('px', '')),
    afterTransform: (value: number) => value + 'px'
  },
  lineHeight: {
    label: '行高',
    component: 'el-slider',
    extraProps: { min: 1, max: 3, step: 0.1 },
    eventName: 'input'
  },
  textAlign: {
    label: '对齐',
    component: 'el-radio-group',
    subComponent: 'el-radio-button',
    options: [
      { label: '左', value: 'left' },
      { label: '中', value: 'center' },
      { label: '右', value: 'right' }
    ],
    initalTransform: (v: string) => (v === 'left' ? '左' : v === 'center' ? '中' : '右'),
    afterTransform: (v: string) => (v === '左' ? 'left' : v === '中' ? 'center' : 'right')
  },
  fontFamily: {
    label: '字体',
    component: 'el-select',
    subComponent: 'el-option',
    options: [...fontFamilyOptions],
    subComponentProps: {
      labelTransform: (v: string) => fontFamilyArr.find((font) => font.value === v)?.label
    },
    extraProps: {}
  },
  color: {
    label: '颜色',
    component: 'color-picker',
    valueProps: 'value'
  }
}
