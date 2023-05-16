<template>
  <div class="props-table">
    <div class="prop-item" v-for="(value, key) in finalProps" :key="key">
      <component v-if="value" :is="value?.component" :value="value.value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TextComponentProps } from '@/regist-components/defaultProps'
import { mapPropsToForms, type PropToForms } from '@/regist-components/propsMap'
import _ from 'lodash'
import { computed, defineProps, type PropType } from 'vue'

const props = defineProps({
  props: { type: Object as PropType<Partial<TextComponentProps>>, required: true }
})

const finalProps = computed(() => {
  return _.reduce(
    props.props,
    (result, value, key) => {
      const newKey = key as keyof TextComponentProps
      const item = mapPropsToForms[newKey]
      if (item) {
        item.value = value
        result[newKey] = item
      }
      return result
    },
    {} as PropToForms
  )
})
</script>

<style scoped></style>
