
/**
 * API锚点跳转组件，点击图片跳转到指定锚点
 */
<template>
  <a :href="'#' + anchor" class="anchor">
    <img src="" />
  </a>
</template>

<script setup lang="ts">
// API锚点跳转组件，点击图片跳转到指定锚点
const props = defineProps({
  anchor: {
    type: String,
    default: 'api'
  }
})
</script>

<style scoped lang="scss">
.anchor {
  display: inline-block;
  margin-left: 1.2rem;
  transform: translateY(0.5rem);

  img {
    width: 2rem;
  }
}
</style>
