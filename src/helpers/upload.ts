/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-05 17:42 周3
 * @Description  : 上传一些工具方法
 */
import { ElMessage } from 'element-plus'
/** 上传文件校验条件 */
interface FileUploadCheckCondition {
  format?: string[]
  // 单位 Mb
  size?: number
}

type UploadCheckError = 'size' | 'format' | null

export function beforeUploadCheck(file: File, condition: FileUploadCheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? file.size / 1024 / 1024 < size : true

  let error: UploadCheckError = null
  if (!isValidFormat) error = 'format'
  if (!isValidSize) error = 'size'

  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export function commonUploadCheck(file: File): boolean {
  const { passed, error } = beforeUploadCheck(file, {
    format: ['image/jpeg', 'image/png'],
    size: 1
  })
  if (error === 'size') ElMessage.warning('上传图片不能超过 1Mb')
  if (error === 'format') ElMessage.warning('上传图片只能是 JPG/PNG 格式')
  return passed
}
