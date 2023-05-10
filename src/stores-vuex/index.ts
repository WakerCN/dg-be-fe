import { createStore } from 'vuex'

const vuexStore = createStore({
  state: { count: 0 },
  mutations: {
    add(state, payload) {
      state.count++
    }
  }
})

export { vuexStore }
