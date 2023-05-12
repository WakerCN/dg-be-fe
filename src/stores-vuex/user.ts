import type { Module } from 'vuex'
import type { GlobalStore } from '.'

interface UserInfo {
  username: string
  isLogin: boolean
}

const user: Module<UserInfo, GlobalStore> = {
  state: {
    username: 'waker',
    isLogin: false
  },
  mutations: {
    login(state) {
      state.username = 'waker'
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    }
  }
}

export { user }

export type { UserInfo }
