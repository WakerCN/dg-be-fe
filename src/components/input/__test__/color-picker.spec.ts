import { mount, type VueWrapper } from '@vue/test-utils'
import rgbHex from 'rgb-hex'
import { beforeAll, describe, expect, it } from 'vitest'
import ColorPicker from '../ColorPicker.vue'
import { defaultColorList } from '../const'

let wrapper: VueWrapper<any>

describe('ColorPicker test', () => {
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: '#ca3f4f',
        colors: defaultColorList
      }
    })
  })

  it('是否渲染正确的接口', () => {
    // <div><input/><div>
    // <ul class="picked-color-list">
    //   <li class="item" or class="transparent-item"></li>
    // </ul>

    // 测试左侧是否为input，类型和值是否正确
    expect(wrapper.find('input').exists()).toBeTruthy()
    const inputEl = wrapper.get('input').element
    expect(inputEl.type).toBe('color')
    expect(inputEl.value).toBe('#ca3f4f')

    // 测试右侧是否有颜色列表
    expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColorList.length)

    // 检查一个元素backgroundColor属性是否相等对应颜色
    const firstItem = wrapper.get('li:first-child div').element as HTMLElement
    expect('#' + rgbHex(firstItem.style.backgroundColor)).toBe(defaultColorList[0].toLowerCase())

    // 测试最后一个元素是否有特殊类名h
    const lastItem = wrapper.get('li:last-child div').element as HTMLElement
    expect(lastItem.classList.contains('transparent-item')).toBeTruthy()
  })

  it('input修改后，是否发送了对应的事件和对应的值', async () => {
    const blackHex = '#000000'
    const input = wrapper.get('input')
    await input.setValue(blackHex)
    expect(wrapper.emitted()).toHaveProperty('change')
    const events = wrapper.emitted('change')
    expect(events![0]).toEqual([blackHex])
  })

  it('点击颜色列表，组件是否发射对应的值', async () => {
    const firstItem = wrapper.get('li:first-child div')
    await firstItem.trigger('click')
    const events = wrapper.emitted('change')
    expect(events![1]).toEqual([defaultColorList[0]])
  })
})
