<template>
  <ElButton v-if="!user.isLogin" class="user-profile-comp" type="primary" @click="handleLogin">
    登录
  </ElButton>
  <ElDropdown v-else class="user-profile-comp" split-button type="default">
    {{ user.username }}
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="handleLogout">退出</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import type { GlobalStore } from '@/stores-vuex'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { UserInfo } from '@/stores-vuex/user'

defineProps({ user: { type: Object as PropType<UserInfo>, required: true } })

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
  setTimeout(() => router.push({ name: 'home' }), 2000)
}
</script>

<style scoped></style>
