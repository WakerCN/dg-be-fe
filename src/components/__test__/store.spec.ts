/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-31 17:15 周3
 * @Description  : 
 */
import { describe, expect, it } from 'vitest'
import { vuexStore } from '@/stores-vuex'
import { testEditorData } from '@/stores-vuex/editor'
import type { TextComponentProps } from '@/regist-components/defaultProps'
import { clone } from 'lodash'
const cloneEditorData = clone(testEditorData)

describe('test vuex store', () => {
  it('应该包含的模块', () => {
    expect(vuexStore.state).toHaveProperty('user')
    expect(vuexStore.state).toHaveProperty('products')
    expect(vuexStore.state).toHaveProperty('editor')
  })

  // describe('user模块', () => {})

  // describe('products模块', () => {})

  describe('editor模块', () => {
    it('是有默认组件', () => {
      expect(vuexStore.state.editor.components).toHaveLength(cloneEditorData.length)
    })

    it('mutation测试 onActiveComponent', () => {
      vuexStore.commit('onActiveComponent', cloneEditorData[0].id)
      expect(vuexStore.state.editor.currentElement).toBe(cloneEditorData[0].id)
      expect(vuexStore.getters.getCurrentComponentProps.id).toBe(cloneEditorData[0].id)
    })

    it('添加组件', () => {
      const payload: Partial<TextComponentProps> = {
        text: 'text1'
      }
      vuexStore.commit('addComponent', payload)
      expect(vuexStore.state.editor.components).toHaveLength(cloneEditorData.length + 1)
    })
  })
})
