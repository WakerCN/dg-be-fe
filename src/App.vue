<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UserProfile from './components/UserProfile.vue'
import FileUploader from './components/input/FileUploader.vue'

const router = useRouter()
const store = useStore()
const fileUploadRef = ref()
const handleUpload = () => {
  const { doUploadFile } = fileUploadRef.value
  doUploadFile()
}

const handleBackHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="wrap">
    <FileUploader ref="fileUploadRef" action="test.url" :dragable="true" :auto-upload="false">
      <template v-slot:default>
        <div class="upload-wrap">点击上传</div>
      </template>
    </FileUploader>
    <ElButton @click="handleUpload" style="width: 300px; margin-left: 10px">手动上传</ElButton>
    <header class="header">
      <div @click="handleBackHome" class="logo">
        <el-icon style="vertical-align: middle"><ElementPlus /></el-icon>
        <span style="vertical-align: middle"> 乐高 </span>
      </div>
      <UserProfile :user="store.state.user" />
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
  min-width: 600px;
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

.upload-wrap {
  color: var(--el-text-color-primary);
  border: 1px dashed var(--el-border-color);
  height: 50px;
  .flex-center();
  .base-transition();

  &:hover {
    border-color: var(--el-color-primary);
    background: var(--el-bg-color-page);
  }
}
</style>
