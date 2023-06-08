import { VueWrapper, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'
import { beforeAll, afterEach, describe, expect, it, vi, type Mocked } from 'vitest'
import HelloWorldVue from '../HelloWorld.vue'

vi.mock('axios')
const mockAxios = axios as Mocked<typeof axios>

const msg = 'init message'
let wrapper: VueWrapper<any>

describe('HelloWorld.vue', () => {
  beforeAll(() => {
    wrapper = shallowMount(HelloWorldVue, { props: { msg } })
  })

  afterEach(() => {
    mockAxios.get.mockReset()
  })

  it('renders props.msg when passed', () => {
    // const msg = 'new message'
    // const wrapper = mount(HelloWorldVue, { props: { msg } })
    // const wrapper = shallowMount(HelloWorldVue, { props: { msg } })
    // console.log(wrapper.html())
    // console.log('text: ', wrapper.get('h2'))
  })

  it('trigger click', async () => {
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('2')
  })

  it('from refresh', async () => {
    const todoContent = 'learn data structure'

    await wrapper.get('input').setValue(todoContent)
    const inputSecond = wrapper.get('input').element.value

    expect(inputSecond).toBe(todoContent)

    await wrapper.get('.addTodo').trigger('click')
    expect(wrapper.findAll('li')).toHaveLength(1)

    expect(wrapper.get('li').text()).toBe(todoContent)

    expect(wrapper.emitted()).toHaveProperty('send')
    const events = wrapper.emitted('send')
    expect(events?.[0]).toEqual([todoContent])
  })

  it('load user pre', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { username: 'waker' } })
    await wrapper.get('.loadUser').trigger('click')
  })

  it('load user', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { username: 'waker' } })
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled()
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    await flushPromises()
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.find('.userName').text()).toBe('waker')
  })
})
