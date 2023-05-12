import { createStore } from 'vuex'
import { editor, type EditorStore } from './editor'
import { products, type ProductsStore } from './product'
import { user, type UserInfo } from './user'

interface GlobalStore {
  user: UserInfo
  products: ProductsStore
  editor: EditorStore
}

const vuexStore = createStore<GlobalStore>({
  modules: {
    user: user,
    products: products,
    editor: editor
  }
})

export type { GlobalStore }
export { vuexStore }
