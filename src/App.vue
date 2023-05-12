<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import UserProfile from './components/UserProfile.vue'
const router = useRouter()

const handleBackHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="wrap">
    <header class="header">
      <div @click="handleBackHome" class="logo">
        <el-icon style="vertical-align: middle"><ElementPlus /></el-icon>
        <span style="vertical-align: middle"> 乐高 </span>
      </div>
      <UserProfile />
    </header>
    <div class="main">
      <section class="content">
        <RouterView />
      </section>
      <footer class="footer">© LeGao 2023</footer>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: 60px;
    width: 100%;
    color: #fff;
    font-size: 24px;
    line-height: 60px;
    background: rgba(24, 26, 42);
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 0 20px;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      cursor: pointer;
    }
  }

  .main {
    overflow-y: auto;
    width: 100%;
    height: calc(100% - 60px);

    .content {
      // height: calc(100% - 60px);
      min-height: calc(100% - 60px);
      padding: 20px 150px;
      display: grid;
    }

    .footer {
      height: 60px;
      background: rgba(24, 26, 42);
      padding: 20px;
      color: #fff;
    }
  }
}
</style>
