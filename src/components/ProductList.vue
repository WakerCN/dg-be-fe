<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="item in list" :key="item.id" :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ item.name }}</span>
              <div>
                <el-button
                  type="success"
                  :icon="View"
                  circle
                  @click="(e: any) => handleView(e, item)"
                />
                <el-button
                  type="primary"
                  :icon="Edit"
                  circle
                  @click="(e: any) => handleEdit(e, item)"
                />
                <el-button type="danger" :icon="Delete" circle />
              </div>
            </div>
          </template>
          <div class="card-item"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete, View } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
interface IProduct {
  id: string
  name: string
}

type IProductList = Array<IProduct>

const list = ref<IProductList>([
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
])

const handleView = (e: any, product: IProduct) => {
  console.info('%c 🍺 e ', 'color:#fff;background:#f5ce50', e)
  console.info('%c 🍅 product ', 'color:#fff;background:#7f2b82', product)
  router.push(`/detail/${product.id}`)
}

const handleEdit = (e: any, product: IProduct) => {
  router.push({ name: 'product-edit', params: { id: product.id } })
}
</script>

<style lang="less" scoped>
.box-card {
  height: 500px;
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
