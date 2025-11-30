
/**
 * 组件版本
 */
<script setup lang="ts">
import { type PropType } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'danger' | ''>,
    default: 'danger'
  },
  showSuffix: {
    type: Boolean,
    default: true
  }

})

</script>

<template>
  <el-tag v-if="text" text style="vertical-align: top;margin-left:8px;" size="small" effect="dark" :type="type" round>v{{ text }}{{ showSuffix ? '+' : '' }}</el-tag>
</template>
