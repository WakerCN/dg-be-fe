<template>
  <PruductList :list="list" />
</template>

<script setup lang="ts">
import PruductList from '@/components/ProductList.vue'
import type { GlobalStore } from '@/stores-vuex'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore<GlobalStore>()
const list = computed(() => store.state.products.data)
</script>

<style lang="less" scoped></style>
