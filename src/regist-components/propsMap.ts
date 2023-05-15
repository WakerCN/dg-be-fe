import type { TextComponentProps } from './defaultProps'

export interface PropToForm {
  component: string
  value?: any
}

export type PropToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropToForms = {
  text: {
    component: 'el-input'
  }
}
