<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-05 17:06 周3
 * @Description  : 上传图片组件
-->
<template>
  <FileUploader
    class="style-uploader"
    :action="'http://local.test:7001/api/upload/'"
    :showUploadList="false"
    :beforeUpload="commonUploadCheck"
    @onSuccess="
      (data) => {
        handleUplooadSuccess(data.resp)
      }
    "
  >
    <div class="up-container">上传图片</div>
  </FileUploader>
</template>

<script setup lang="ts">
import FileUploader from '@/components/input/FileUploader.vue'
import { commonUploadCheck } from '@/helpers/upload'
import { defineEmits } from 'vue'

const emit = defineEmits(['onsuccess'])

const handleUplooadSuccess = (resp: any) => {
  emit('onsuccess', resp)
}
</script>

<style scoped></style>
