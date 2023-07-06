/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-12 17:46 周5
 * @Description  :
 */
import type { ComponentData } from '@/stores-vuex/editor'
import _ from 'lodash'
import { computed } from 'vue'

const useComponentCommon = (props: Readonly<ComponentData['props']>, picks: string[]) => {
  const styleProps = computed(() => _.pick(props, picks))

  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url
    }
  }

  return {
    styleProps,
    handleClick
  }
}

export { useComponentCommon }
