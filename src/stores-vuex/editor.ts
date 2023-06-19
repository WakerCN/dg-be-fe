/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-12 14:29 周5
 * @Description  : 编辑器store及ts定义
 */

import type { Module } from 'vuex'
import type { GlobalStore } from '.'
import { v4 as uuid } from 'uuid'
import type { TextComponentProps } from '@/regist-components/defaultProps'

interface EditorStore {
  /** 中间编辑器渲染数组 */
  components: ComponentData[]
  /** 当前编辑的是哪个元素 */
  currentElement: string
}

interface ComponentData {
  /** 组件id */
  id: string
  /** 业务组件名 l-text、l-image 等等 */
  name: string
  /** 元素属性 */
  props: Partial<TextComponentProps>
}

export const testEditorData: ComponentData[] = [
  {
    id: uuid(),
    name: 'l-text',
    props: {
      // actionType: 'url',
      // url: 'https://www.baidu.com',
      text: 'text1',
      fontSize: '20px',
      lineHeight: 1.6,
      color: '#000000',
      textAlign: 'left',
      fontFamily: ''
    }
  },
  {
    id: uuid(),
    name: 'l-text',
    props: {
      text: 'text2',
      fontSize: '12px',
      lineHeight: 1,
      textAlign: 'right',
      fontFamily: ''
    }
  },
  {
    id: uuid(),
    name: 'l-text',
    props: {
      text: 'text3',
      fontSize: '16px',
      lineHeight: 1.2,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: ''
    }
  }
]

const editor: Module<EditorStore, GlobalStore> = {
  state: {
    components: testEditorData,
    currentElement: ''
  },
  mutations: {
    addComponent(state, payload: Partial<TextComponentProps>) {
      const newComponent: ComponentData = {
        id: uuid(),
        name: 'l-text',
        props: payload
      }
      state.components.push(newComponent)
    },
    onActiveComponent(state, id: string) {
      state.currentElement = id
    },
    updateComponent(state, { key, value }) {
      const updateComponent = state.components.find((c) => c.id === state.currentElement)
      if (updateComponent) {
        updateComponent.props[key as keyof TextComponentProps] = value
      }
    }
  },
  getters: {
    getCurrentComponentProps: (state) => {
      return state.components.find((c) => c.id === state.currentElement)
    }
  }
}

export type { EditorStore, ComponentData }

export { editor }
