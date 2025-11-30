/**
 * 演示扫码
 */
<template>
  <div class="demo-scan-row">
    <div v-for="(item, index) in currentList" :key="index" class="demo-scan-col">
      <div v-if="item.fullscreen" class="demo-scan-item" :style="{ borderColor: props.borderColor }">
        <img :src="item.img" />
      </div>
      <div v-else class="demo-scan-item" :style="{ borderColor: props.borderColor }">
        <a v-if="item.url" :href="item.url" target="_blank">
          <img :src="item.img" />
        </a>
        <img v-else :src="item.img" />
        <div class="demo-scan-name">{{ item.name }}</div>
        <p class="demo-scan-tips">{{ item.tips }}</p>
        <!-- <p v-if="item.url" class="demo-click-tips">(可直接点击图片)</p> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: '4'
  },
  borderColor: {
    type: String,
    default: '#dcdfe6'
  }
})

const list: any[] = [
  // { name: '微信小程序', img: 'https://ik.imagekit.io/anyup/images/social/qr_uview_pro_wx.jpg', type: '4', tips: '微信扫码' },
  // { name: '支付宝小程序', img: 'https://ik.imagekit.io/anyup/images/social/qr_uview_pro_alipay.png', type: '4', tips: '支付宝扫码' },
  // { name: 'H5', img: 'https://ik.imagekit.io/anyup/images/social/qr_uview_pro_h5.png', type: '4', tips: '浏览器扫码' },
  // { name: '安卓', img: 'https://ik.imagekit.io/anyup/images/social/qr_uview_pro_android.png', type: '4', tips: '浏览器扫码' },
  // { img: '/uview/images/thumb.png', type: '0', fullscreen: true },
  // { name: '微信小程序', img: '/uview/images/qr_uview_pro_wx.jpg', tips: '微信扫码', type: '0', url: '' },
  // { name: '浏览器 H5', img: '/uview/images/qr_uview_pro_h5.png', tips: '浏览器扫码', type: '0', url: 'https://h5.wot-ui-plus.cn/' },
  // { name: '安卓', img: '/uview/images/qr_uview_pro_android.png', tips: '浏览器扫码安装', type: '0', url: 'https://www.pgyer.com/wot-ui-plus' },
  // { img: '/anyup/images/thumb-colorful-app.png', type: '1', fullscreen: true },
  // { name: '微信小程序', img: '/anyup/images/qr_wx_colorful.jpg', tips: '微信扫码', type: '1', url: '' },
  // { name: '浏览器 H5', img: '/anyup/images/qr_h5.png', tips: '浏览器扫码', type: '1', url: 'https://h5.wot-ui-plus.cn/' },
  // { name: '安卓', img: '/anyup/images/qr_android.png', tips: '浏览器扫码安装', type: '1', url: 'https://www.pgyer.com/anyup-demo' },
  // { name: '有题记', img: '/anyup/images/qr_wx_youti.jpg', tips: '微信扫码', type: '2', url: '' },
  // { img: '/anyup/images/youti1.png', type: '2', fullscreen: true },
  // { img: '/anyup/images/youti2.png', type: '2', fullscreen: true },
  // { img: '/anyup/images/youti3.png', type: '2', fullscreen: true },
  // { name: '微信公众号', img: '/anyup/images/qr_wx_public.jpg', tips: '微信扫码', type: '3', url: '' },
  // { name: '掘金', img: '/anyup/images/juejin.png', tips: '点击查看关注我', type: '3', url: 'https://juejin.cn/user/4230576472589976/posts' },
  // { name: 'CSDN', img: '/anyup/images/csdn.png', tips: '点击查看关注我', type: '3', url: 'https://blog.csdn.net/qq_24956515' },
  // { name: '语雀', img: '/anyup/images/yuque.png', tips: '点击查看关注我', type: '3', url: 'https://www.yuque.com/anyup' }
]
const currentList = computed(() => {
  return list.filter(item => item.type === props.type)
})
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
  width: 25%;
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
  padding: 40px 0;
  min-height: 210px;
  transition: all 0.3s;
  height: 315px;
}

.demo-scan-item:hover {
  bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.demo-scan-item img {
  width: 150px;
  margin: auto;
  display: block;
  max-width: 100%;
}

.demo-scan-item .demo-scan-name {
  color: #606266;
  font-size: 18px;
  margin: 20px 0;
  height: 30px;
}

.demo-scan-item .demo-scan-tips {
  text-align: center;
  position: absolute;
  font-size: 14px;
  bottom: 30px;
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

@media (max-width: 1550px) {
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
