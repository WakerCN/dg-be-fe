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
import type { ProductInfo } from '@/stores-vuex'
import { Edit, Delete, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'

defineProps({ list: { type: Array as PropType<ProductInfo[]> } })
const router = useRouter()

const handleView = (e: any, product: ProductInfo) => {
  console.info('%c 🍺 e ', 'color:#fff;background:#f5ce50', e)
  console.info('%c 🍅 product ', 'color:#fff;background:#7f2b82', product)
  router.push(`/detail/${product.id}`)
}

const handleEdit = (e: any, product: ProductInfo) => {
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
