import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeAll, describe, expect, it, vi, type Mocked } from 'vitest'
import UserProfile from '../UserProfile.vue'
import { ElMessage } from 'element-plus'
import { vuexStore } from '@/stores-vuex'

let wrapper: VueWrapper<any>

vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn()
  }
}))
// vi.mock('vuex')
const mockedRoutes: string[] = []
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: (url: string) => mockedRoutes.push(url) })
}))

const mockComponent = {
  template: '<div><slot></slot></div>'
}
const mockElDropDown = {
  template: '<div><slot></slot><slot name="dropdown"></slot></div>'
}

const globalComponents = {
  'ElButton': mockComponent,
  'ElDropdown': mockElDropDown,
  'ElDropdownMenu': mockComponent,
  'ElDropdownItem': mockComponent
}

describe('UserProfile component', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    wrapper = mount(UserProfile, {
      props: { user: { isLogin: false, username: '' } },
      global: { components: globalComponents, provide: { store: vuexStore } }
    })
  })

  afterEach(() => {
    ;(ElMessage as Mocked<typeof ElMessage>).success.mockReset()
  })

  it('渲染登录按钮，当用户没有登录时', async () => {
    expect(wrapper.get('div').text()).toBe('登录')
    await wrapper.get('div').trigger('click')
    expect(ElMessage.success).toHaveBeenCalledTimes(1)
    expect(vuexStore.state.user.username).toBe('waker')
  })

  it('渲染登录按钮，当用户登录时', async () => {
    await wrapper.setProps({ user: { username: 'waker', isLogin: true } })
    expect(wrapper.get('.user-profile-comp').html()).toContain('waker')
    expect(wrapper.find('.user-profile-comp').exists()).toBeTruthy()
  })

  it('测试登出', async () => {
    await wrapper.get('.user-profile-comp div div').trigger('click')
    expect(vuexStore.state.user.isLogin).toBeFalsy()
    expect(ElMessage.success).toBeCalledTimes(1)
    vi.runAllTimers()
    expect(mockedRoutes).toEqual([{ name: 'home' }])
  })
})
