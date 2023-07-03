<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-06-27 16:52 周2
 * @Description  : 上传组件
-->
<template>
  <div class="file-upload">
    <input ref="inputRef" type="file" :style="{ display: 'none' }" @change="fileChange" />
    <div
      :class="{ 'upload-area': true, isDragOver: dragable && isDragOver }"
      :disabled="uploadingFile"
      v-on="events"
    >
      <slot v-if="uploadingFile" name="loading">
        <span>正在上传</span>
      </slot>
      <slot
        v-else-if="lastUploadfile && lastUploadfile.loaded"
        :uploadedData="lastUploadfile.data"
        name="uploaded"
      >
      </slot>
      <slot v-else name="default">
        <button class="upload-btn">点击上传</button>
      </slot>
    </div>
    <span v-if="uploadingFile" class="result"> 上传中 </span>
    <ul class="list-wrap">
      <li v-for="file in uploadFiles" :key="file.id" :class="`upload-item upload-${file.status}`">
        <span class="filename">{{ file.name }}</span>
        <ElIcon>
          <Delete class="delete-btn" @click="removeFile(file)" />
        </ElIcon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import axios from 'axios'
import _ from 'lodash'
import { v4 } from 'uuid'
import { computed, defineProps, reactive, ref, type PropType } from 'vue'
/** 上传组件状态 */
type UploadStatus = 'idle' | 'loading' | 'success' | 'failed'
/** 上传文件状态 */
interface UploadFile {
  id: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any
}
/** 检查上传 */
type CheckedUpload = (file: File) => boolean | Promise<File>

const props = defineProps({
  action: { type: String, required: true },
  beforeUpload: { type: Function as PropType<CheckedUpload> },
  dragable: { type: Boolean, default: false }
})

const inputRef = ref<HTMLInputElement | null>(null)
const uploadFiles = ref<UploadFile[]>([])
const isDragOver = ref<boolean>(false)

const uploadingFile = computed(() => uploadFiles.value.some((f) => f.status === 'loading'))

const lastUploadfile = computed(() => {
  const lastFile = _.last(uploadFiles.value)
  if (lastFile) {
    return {
      loaded: lastFile.status === 'success',
      data: lastFile.resp
    }
  }
  return null
})

const triggerUpload = () => {
  if (inputRef.value) {
    inputRef.value.click()
  }
}

const postFile = (file: File) => {
  const formData = new FormData()
  formData.append(file.name, file)
  const fileObj = reactive<UploadFile>({
    id: v4(),
    name: file.name,
    size: file.size,
    status: 'loading',
    raw: file
  })
  uploadFiles.value.push(fileObj)
  axios
    .post(props.action, formData, {
      headers: {
        'Content-Type': 'mutipart/form-data'
      }
    })
    .then((response) => {
      fileObj.status = 'success'
      fileObj.resp = response.data
    })
    .catch((e) => {
      fileObj.status = 'failed'
      console.log('%c 🍣 e', 'font-size:16px;color:#ffffff;background:#ff7979', e)
    })
    .finally(() => {
      if (inputRef.value) {
        inputRef.value.value = ''
      }
    })
}

const doUploadFiles = (files: FileList | null) => {
  if (files) {
    const file = files[0]
    if (props.beforeUpload) {
      const result = props.beforeUpload(file)
      if (result && result instanceof Promise) {
        result
          .then((processedFile) => {
            if (processedFile instanceof File) {
              postFile(processedFile)
            } else {
              throw new Error('beforeUpload() Promise should return File Object')
            }
          })
          .catch((e) => {
            console.log('%c 🍫 e ', 'font-size:16px;color:#ffffff;background:#6ab04c', e)
          })
      } else if (result === true) {
        postFile(file)
      }
    } else {
      postFile(file)
    }
  }
}

const fileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  doUploadFiles(target.files)
}

const removeFile = (file: UploadFile) => {
  uploadFiles.value = uploadFiles.value.filter((f) => f.id !== file.id)
}

const handleDrag = (e: DragEvent, over: boolean) => {
  e.preventDefault()
  isDragOver.value = over
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  if (e.dataTransfer) {
    doUploadFiles(e.dataTransfer.files)
  }
}

let events: Record<string, (e: any) => void> = {
  'click': triggerUpload
}
if (props.dragable) {
  events = {
    ...events,
    'dragover': (e: DragEvent) => handleDrag(e, true),
    'dragleave': (e: DragEvent) => handleDrag(e, false),
    'drop': handleDrop
  }
}
</script>

<style lang="less" scoped>
.file-upload {
  margin: 0 10px;

  .upload-area {
    margin-bottom: 10px;

    .upload-btn {
      padding: 6px;
    }
  }

  .list-wrap {
    max-height: 195px;
    padding-right: 4px;
    overflow-y: auto;
    width: 300px;

    .upload-item {
      padding: 6px 6px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid transparent;
      border-radius: 6px;
      transition: all 0.3s ease;

      &.upload-failed {
        background: var(--el-color-danger-light-8);
      }

      &.upload-success {
        background: var(--el-color-success-light-8);
      }

      &:hover {
        border-color: var(--el-color-primary-light-5);
      }

      .filename {
        .text-ellipsis();
        padding-right: 10px;
      }

      .delete-btn {
        color: var(--el-text-color-regular);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          color: var(--el-color-danger);
        }
      }
    }
  }
}
</style>
