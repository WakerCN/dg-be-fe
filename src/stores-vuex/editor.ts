/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-12 14:29 周5
 * @Description  : 编辑器store及ts定义
 */

import type { Module } from 'vuex'
import type { GlobalStore } from '.'
import { v4 as uuid } from 'uuid'

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
  props: { [key: string]: any }
}

const testEditorData: ComponentData[] = [
  { id: uuid(), name: 'l-text', props: { text: 'text1', fontSize: '20px', color: 'red' } },
  { id: uuid(), name: 'l-text', props: { text: 'text2', fontSize: '12px' } },
  { id: uuid(), name: 'l-text', props: { text: 'text3', fontSize: '16px', fontWeight: 'bold' } }
]

const editor: Module<EditorStore, GlobalStore> = {
  state: {
    components: testEditorData,
    currentElement: ''
  }
}

export type { EditorStore, ComponentData }

export { editor }
