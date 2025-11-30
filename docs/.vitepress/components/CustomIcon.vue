/**
 * 自定义图标
 */
<template>
  <text :class="[prefix, `${prefix}-${name}`]" :style="{ 'font-size': size, color: color }"> </text>
</template>
<script setup lang="ts">
const props = defineProps({
  // 图标类名
  name: {
    type: String,
    required: true,
    default: ''
  },
  // 图标颜色，可接受主题色
  color: {
    type: String,
    default: '#666'
  },
  // 字体大小，单位rpx
  size: {
    type: String,
    default: '16px'
  },
  // 图标前缀
  prefix: {
    type: String,
    default: 'custom-icon'
  }
})
</script>
