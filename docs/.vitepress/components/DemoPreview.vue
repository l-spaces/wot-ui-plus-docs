
/**
 * 演示预览
 */
<template>
  <div class="demo-preview-wrap">
    <img src="/images/iphone.png" />
    <span class="demo-time">{{ currentTime() }}</span>
    <iframe scrolling="auto" frameborder="0" :src="`${baseUrl}${url}`" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  baseUrl: {
    type: String,
    default: 'https://h5.wot-ui-plus.cn/#/'
  }
})

const currentTime = () => {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
  return `${h}:${m}`
}
</script>

<style scoped>
.demo-preview-wrap {
  position: fixed;
  z-index: 29;
  right: 20px;
  top: calc(50vh - 300px + 1.8rem);
  width: 330px;
  height: 600px;
  box-sizing: border-box;
  border-radius: 30px;
  margin: 0 !important;

  top: calc(50vh - 350px + 1.8rem);
  height: 100vh;
  min-height: 600px;
  max-height: 700px;
}

.demo-preview-wrap img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 11;
}

.demo-preview-wrap .demo-time {
  position: absolute;
  top: 17px;
  left: 37px;
  z-index: 12;
  font-size: 12px;
  color: #becde9;
  font-weight: 700;
}

.demo-preview-wrap iframe {
  position: relative;
  /* padding: 48px 16px 28px 16px; */
  padding: 40px 19px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  z-index: 12;
}

@media screen and (min-width: 1301px) and (max-width: 1449px) {
  .demo-preview-wrap {
    display: block;
  }
}

@media (max-width: 1279px) {
  .demo-preview-wrap {
    display: none;
  }
}
</style>
