/**
 * 群聊二维码
 */
<template>
  <div class="demo-scan-row">
    <div v-for="(item, index) in currentList" :key="index" class="demo-scan-col">
      <div v-if="item.fullscreen" class="demo-scan-item" :style="{ borderColor: borderColor }">
        <img :src="item.img" />
      </div>
      <div v-else class="demo-scan-item" :style="{ borderColor: borderColor }">
        <a v-if="item.url" :href="item.url" target="_blank">
          <img :src="item.img" />
        </a>
        <img v-else :src="item.img" />
        <div class="demo-scan-name">{{ item.name }}</div>
        <!-- <p class="demo-scan-tips">{{ item.tips }}</p> -->
        <!-- <p v-if="item.url" class="demo-click-tips">(可直接点击图片)</p> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 群二维码列表项类型定义
interface GroupItem {
  name: string
  img: string
  tips: string
  type: string
  url: string
  fullscreen?: boolean
}

import { computed, ref } from 'vue'

// 组件 props
const props = defineProps({
  type: {
    type: String,
    default: '1'
  },
  borderColor: {
    type: String,
    default: '#dcdfe6'
  }
})

// 群二维码数据列表
const list = ref<GroupItem[]>([
  {
    name: '微信群',
    img: `https://ik.imagekit.io/anyup/images/social/weixin-chat.png?updatedAt=${new Date().getTime()}`,
    tips: '微信扫码',
    type: '1',
    url: ''
  },
  {
    name: 'QQ群',
    img: 'https://ik.imagekit.io/anyup/images/social/qq-chat.png',
    tips: '浏览器扫码',
    type: '1',
    url: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=98nSVDldWEbDdq4lxiP4aL7uATfMSlI6&authKey=G2yQJ5MQiKzMldaxBsIfKt17NuJuUw8Fr6zdKLggc6NZXgw4BVbqkU2U3EE994yd&noverify=0&group_code=811732166'
  }
])

// 当前类型的二维码列表
const currentList = computed(() => list.value.filter(item => item.type === props.type))
</script>

<style scoped>
.demo-scan-row {
  display: block;
  position: relative;
}

.demo-scan-row:before,
.demo-scan-row:after {
  display: table;
  content: ' ';
}

.demo-scan-row:after {
  clear: both;
}

.demo-scan-col {
  width: 50%;
  float: left;
}

.demo-scan-item {
  position: relative;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  transition: bottom 0.4s;
  position: relative;
  bottom: 0;
  margin: 20px 10px;
  /* padding: 40px 0; */
  min-height: 210px;
  transition: all 0.3s;
  height: 400px;
}

.demo-scan-item:hover {
  bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.demo-scan-item img {
  height: 370px;
  margin: auto;
  display: block;
  max-width: 100%;
}

.demo-scan-item .demo-scan-name {
  color: #606266;
  font-size: 18px;
  height: 30px;
}

.demo-scan-item .demo-scan-tips {
  text-align: center;
  position: absolute;
  font-size: 14px;
  bottom: 0;
  left: auto;
  width: 100%;
  right: auto;
  color: #909399;
}

.demo-scan-item .demo-click-tips {
  text-align: center;
  position: absolute;
  font-size: 12px;
  bottom: 0;
  left: auto;
  width: 100%;
  right: auto;
  color: #909399;
}

@media (max-width: 1200px) {
  .demo-scan-col {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .demo-scan-col {
    width: 100%;
  }
}
</style>
