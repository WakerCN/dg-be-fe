import _ from 'lodash'

interface ComponentCommonProps {
  // action
  actionType: string
  url: string

  // size
  width: string
  height: string
  paddingLeft: string
  paddingRight: string
  paddingTop: string
  paddingBottom: string

  // border type
  borderStyle: string
  borderColor: string
  borderWidth: string
  borderRadius: string

  // shadow and opacity
  boxShadow: string
  opacity: number

  // position and x.y
  position: string
  left: string
  top: string
  right: string
}

interface TextComponentProps extends ComponentCommonProps {
  text: string
  fontSize: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textDecoration: string
  lineHeight: number
  textAlign: string
  color: string
  backgroundColor: string
}

interface ImageComponentProps extends ComponentCommonProps {
  src: string
}

const commonDefaultProps: ComponentCommonProps = {
  // action
  actionType: '',
  url: '',

  // size
  width: 'max-content',
  height: '',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '10px',
  paddingBottom: '10px',

  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',

  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: 1,

  // position and x.y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0'
}

const textDefaultProps: TextComponentProps = {
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: 1,
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps
}

export const imageDefaultProps: ImageComponentProps = {
  src: 'test.url',
  ...commonDefaultProps
}

/** 将Props转换成vue识别的Props类型 */
const transfromToComponentProps = <T extends { [key: string]: any }>(props: T) => {
  return _.mapValues(props, (item) => ({ type: item.constructor, default: item }))
}

const textStylePropNames = _.without(Object.keys(textDefaultProps), 'actionType', 'url', 'text')
const imageStylePropNames = _.without(Object.keys(imageDefaultProps), 'actionType', 'url', 'text')

export {
  commonDefaultProps,
  textDefaultProps,
  transfromToComponentProps,
  textStylePropNames,
  imageStylePropNames
}
export type { ComponentCommonProps, TextComponentProps, ImageComponentProps }
