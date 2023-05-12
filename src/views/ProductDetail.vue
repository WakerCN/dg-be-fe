<template>
  <div>
    <span>{{ product.name }} ====》 {{ product.id }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ProductInfo } from '@/stores-vuex/product'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const route = useRoute()
const currendId = route.params.id

const product = computed<ProductInfo>(() => store.getters.getProductById(currendId))
</script>

<style scoped></style>
