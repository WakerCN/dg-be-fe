import type { Module } from 'vuex'
import type { GlobalStore } from '.'

interface ProductInfo {
  id: string
  name: string
  downloadTimes?: number
}

interface ProductsStore {
  data: ProductInfo[]
}

const testProductList: ProductInfo[] = [
  { id: 'p-01', name: '作品一' },
  { id: 'p-02', name: '作品二' },
  { id: 'p-03', name: '作品三' },
  { id: 'p-04', name: '作品四' },
  { id: 'p-05', name: '作品五' },
  { id: 'p-06', name: '作品六' },
  { id: 'p-07', name: '作品七' },
  { id: 'p-08', name: '作品八' },
  { id: 'p-09', name: '作品九' },
  { id: 'p-10', name: '作品十' }
]

const products: Module<ProductsStore, GlobalStore> = {
  state: {
    data: testProductList
  },
  getters: {
    getProductById: (state) => (id: string) => state.data.find((p) => p.id === id)
  }
}

export { products }

export type { ProductInfo, ProductsStore }
