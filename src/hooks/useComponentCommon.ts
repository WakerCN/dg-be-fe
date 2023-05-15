import type { TextComponentProps } from '@/regist-components/defaultProps'
import _ from 'lodash'
import { computed } from 'vue'

const useComponentCommon = (props: Readonly<Partial<TextComponentProps>>, picks: string[]) => {
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
