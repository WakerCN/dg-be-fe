/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-06 15:38 周4
 * @Description  :
 */
export const getImageSize = (url: string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.addEventListener('load', () => {
      const { naturalWidth: width, naturalHeight: height } = img
      resolve({ width, height })
    })
    img.addEventListener('error', (e) => {
      reject(e)
    })
  })
}

export const getWidthfromCss = (widthStr: string): number => {
  if (widthStr.endsWith('px')) {
    return Number(widthStr.replaceAll('px', ''))
  } else {
    return 0
  }
}
