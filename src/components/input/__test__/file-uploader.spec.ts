/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-06-27 17:17 周2
 * @Description  : 文件上传组件测试
 */

import FileUploader from '@/components/input/FileUploader.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'
import { beforeAll, describe, expect, it, vi, type Mocked } from 'vitest'

const mockAxios = axios as Mocked<typeof axios>

vi.mock('axios')

let wrapper: VueWrapper<any>

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('FileUploader Componenent Test', () => {
  beforeAll(() => {
    wrapper = mount(FileUploader as any, {
      props: { action: 'test.url' },
      slots: {
        default: `<button>Custion upload</button>`
      }
    })
  })

  it('基本布局', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.get('input').isVisible()).toBeFalsy()
  })

  it('上传成功流程', async () => {
    mockAxios.post.mockResolvedValueOnce({ status: 'success' })
    const inputEl = wrapper.get('input').element as HTMLInputElement
    const files = [testFile] as any
    Object.defineProperty(inputEl, 'files', { value: files, writable: false })
    await wrapper.get('input').trigger('change')

    expect(wrapper.get('.result').text()).toBe('上传中')
    expect(wrapper.findAll('li').length).toBe(1)
    // 判断上传中按钮为disable
    expect(wrapper.get('.upload-area').attributes()).toHaveProperty('disabled')
    const firstItem = wrapper.get('li:first-child')
    expect(firstItem.classes()).toContain('upload-loading')

    await flushPromises()

    expect(firstItem.classes()).toContain('upload-success')
    expect(firstItem.get('.filename').text()).toBe(testFile.name)
  })

  it('上传失败流程', async () => {
    mockAxios.post.mockRejectedValueOnce({ error: 'error' })
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('.result').text()).toBe('上传中')
    expect(wrapper.findAll('li').length).toBe(2)

    await flushPromises()

    const lastItem = wrapper.get('li:last-child')
    expect(lastItem.classes()).toContain('upload-failed')
    expect(lastItem.get('.filename').text()).toBe(testFile.name)
    // 点击列表右侧的删除，可以删除这一项
    await lastItem.get('.delete-btn').trigger('click')
    expect(wrapper.findAll('li').length).toBe(1)
  })
})

export { }

