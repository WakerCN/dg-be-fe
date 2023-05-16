import type { TextComponentProps } from './defaultProps'

export interface PropToForm {
  /** 属性对应的表单组件 */
  component: string
  /** 表单对应的值 */
  value?: any
  /** 表单对应的标签 */
  label?: string
  /** 组件的额外属性 */
  extraProps?: { [key: string]: any }
}

export type PropToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropToForms = {
  text: {
    label: '文本',
    component: 'el-input'
  },
  fontSize: {
    label: '字号',
    component: 'el-input-number'
  },
  lineHight: {
    label: '行高',
    component: 'el-slider',
    extraProps: { min: 1, max: 3, step: 0.1 }
  }
}
