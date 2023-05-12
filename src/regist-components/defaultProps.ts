import _ from 'lodash'

const commonDefaultProps = {
  // action
  actionType: '',
  url: '',

  // size
  width: '320px',
  height: '',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',

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

const textDefaultProps = {
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps
}

const transfromToComponentProps = <T extends { [key: string]: any }>(props: T) => {
  return _.mapValues(props, (item) => ({ type: item.constructor, default: item }))
}

const textStylePropNames = _.without(Object.keys(textDefaultProps), 'actionType', 'url', 'text')

export { commonDefaultProps, textDefaultProps, transfromToComponentProps, textStylePropNames }
