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
    <ul v-if="showUploadList" class="list-wrap">
      <li v-for="file in uploadFiles" :key="file.id" :class="`upload-item upload-${file.status}`">
        <div class="filename">
          <ElIcon class="file-icon">
            <Document />
          </ElIcon>
          <span class="file-name">
            {{ file.name }}
          </span>
        </div>
        <div class="oprate-area">
          <ElPopover v-if="listType === 'picture'" trigger="click" :width="300">
            <img :src="file.url" class="upload-preview-img" />
            <template #reference>
              <ElIcon class="view-btn">
                <View />
              </ElIcon>
            </template>
          </ElPopover>
          <ElIcon>
            <Delete class="delete-btn" @click="removeFile(file)" />
          </ElIcon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Delete, Document, View } from '@element-plus/icons-vue'
import axios from 'axios'
import _ from 'lodash'
import { v4 } from 'uuid'
import { computed, defineProps, reactive, ref, type PropType } from 'vue'
/** 上传组件状态 */
type UploadStatus = 'idle' | 'loading' | 'success' | 'failed'
type FileListType = 'picture' | 'other'
/** 上传文件状态 */
export interface UploadFile {
  id: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any
  url?: string
}
/** 检查上传 */
type CheckedUpload = (file: File) => boolean | Promise<File>

const props = defineProps({
  action: { type: String, required: true },
  beforeUpload: { type: Function as PropType<CheckedUpload> },
  dragable: { type: Boolean, default: false },
  autoUpload: { type: Boolean, default: true },
  listType: { type: String as PropType<FileListType>, default: 'other' },
  showUploadList: { type: Boolean, default: true }
})

const emit = defineEmits(['onSuccess'])

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

const postFile = (readyFile: UploadFile) => {
  const formData = new FormData()
  formData.append(readyFile.name, readyFile.raw)
  readyFile.status = 'loading'
  axios
    .post(props.action, formData, {
      headers: {
        'Content-Type': 'mutipart/form-data'
      }
    })
    .then((response) => {
      readyFile.status = 'success'
      readyFile.resp = response.data
      emit('onSuccess', readyFile)
    })
    .catch((e) => {
      readyFile.status = 'failed'
      readyFile.resp = {
        data: {
          url: URL.createObjectURL(readyFile.raw)
        }
      }
      emit('onSuccess', readyFile)
      console.log('%c 🍣 e ', 'font-size:16px;color:#ffffff;background:#ff7979', e)
    })
    .finally(() => {
      if (inputRef.value) {
        inputRef.value.value = ''
      }
    })
}

const addFileToList = (uploadFile: File) => {
  const fileObj = reactive<UploadFile>({
    id: v4(),
    name: uploadFile.name,
    size: uploadFile.size,
    status: 'idle',
    raw: uploadFile
  })
  if (props.listType === 'picture') {
    try {
      fileObj.url = URL.createObjectURL(uploadFile)
      // const fileReader = new FileReader()
      // fileReader.readAsDataURL(uploadFile)
      // fileReader.addEventListener('load', () => {
      //   fileObj.url = fileReader.result as string
      // })
    } catch (error) {
      console.log('%c 🍣 error ', 'font-size:16px;color:#ffffff;background:#7ed6df', error)
    }
  }
  uploadFiles.value.push(fileObj)
  if (props.autoUpload) {
    postFile(fileObj)
  }
}

const beforeUploadCheck = (files: FileList | null) => {
  if (files) {
    const file = files[0]
    if (props.beforeUpload) {
      const result = props.beforeUpload(file)
      if (result && result instanceof Promise) {
        result
          .then((processedFile) => {
            if (processedFile instanceof File) {
              addFileToList(processedFile)
            } else {
              throw new Error('beforeUpload() Promise should return File Object')
            }
          })
          .catch((e) => {
            console.log('%c 🍫 e ', 'font-size:16px;color:#ffffff;background:#6ab04c', e)
          })
      } else if (result === true) {
        addFileToList(file)
      }
    } else {
      addFileToList(file)
    }
  }
}

const fileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  beforeUploadCheck(target.files)
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
    beforeUploadCheck(e.dataTransfer.files)
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

const doUploadFile = () => {
  uploadFiles.value.filter((f) => f.status === 'idle').forEach((f) => postFile(f))
}

defineExpose({ doUploadFile, triggerUpload })
</script>

<style lang="less" scoped>
.file-upload {
  width: 100%;

  .upload-area {
    margin: 0;

    &.isDragOver {
      background: #ccc;
    }

    .upload-btn {
      width: 100%;
      padding: 6px;
    }
  }

  .list-wrap {
    margin-top: 10px;
    max-height: 195px;
    overflow-y: auto;

    .upload-item {
      padding: 6px 6px;
      margin-bottom: 4px;
      display: flex;
      flex-shrink: 0;
      justify-content: space-between;
      align-items: center;
      border: 1px solid transparent;
      border-radius: 6px;
      transition: all 0.3s ease;

      &.upload-idle {
        background: var(--el-color-info-light-8);
      }

      &.upload-success {
        background: var(--el-color-success-light-8);
      }

      &.upload-failed {
        background: var(--el-color-danger-light-8);
      }

      &:hover {
        border-color: var(--el-color-primary-light-5);
      }

      > .filename {
        line-height: normal;
        padding-right: 10px;
        .text-ellipsis();

        > .file-icon {
          margin-right: 6px;
        }

        > .file-icon,
        > .file-name {
          vertical-align: middle;
        }

        .name-container {
          overflow: hidden;
          .name {
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .oprate-area {
        .flex-center();

        .view-btn {
          color: var(--el-text-color-regular);
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 10px;

          &:hover {
            color: var(--el-color-primary);
          }
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
}
.upload-preview-img {
  width: 100%;
}
</style>
