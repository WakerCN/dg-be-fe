<template>
  <ElButton v-if="!$store.state.user.isLogin" type="primary" @click="handleLogin">登录</ElButton>
  <ElDropdown v-else split-button type="default">
    {{ $store.state.user.username }}
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="handleLogout">退出</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import type { GlobalStore } from '@/stores-vuex'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useStore<GlobalStore>()

/** 登录 */
const handleLogin = () => {
  store.commit('login')
  ElMessage.success({ message: '登录成功', duration: 2000 })
}

/** 退出登录 */
const handleLogout = () => {
  store.commit('logout')
  ElMessage.success({ message: '退出成功', duration: 2000 })
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 2000)
}
</script>

<style scoped></style>
