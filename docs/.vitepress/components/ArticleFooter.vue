/**
 * 文章页 文章页脚
 */
<template>
  <div v-if="link" class="article-footer-info">
    <h2>{{ name }}</h2>
    <div>
      <p>👨‍🎓 教育 | 计算机科学与技术 · 本科</p>
      <p>👨‍💻 工作 | 前端开发工程师</p>
      <p>🏷️ 技术 | Vue、Angular、React、JS、TS、node、uni-app、小程序等</p>
      <p>
        📱 微信 | anyupxing
        <el-popover placement="top-start" title="扫码添加：anyupxing" :width="200" trigger="hover">
          <img src="/anyup/images/qr_personal_wx.png" alt="" srcset="" />
          <template #reference>
            <span class="cursor follow-us">加我为好友，共同交流进步！</span>
          </template>
        </el-popover>
      </p>
      <p class="cursor">
        🏆 公众号｜ 前端梦工厂
        <el-popover placement="top-start" title="扫码关注：前端梦工厂" :width="200" trigger="hover">
          <img src="/anyup/images/qr_wx_public.jpg" alt="" srcset="" />
          <template #reference>
            <span class="cursor follow-us">关注公众号，让我们一起逐梦前端！</span>
          </template>
        </el-popover>
      </p>
    </div>

    <h4>{{ linkName }}</h4>
    <div class="article-link-info">
      <div class="article-link-info-item" v-for="info in linkList">
        <CustomIcon :name="getLinkType(info) || 'yuanwenlianjie1'" size="20px" :color="getLinkColor(info)" />
        <a :href="getLinkUrl(info)" target="_blank" rel="noopener noreferrer">
          {{ getLinkName(info) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '关于我'
  },
  link: {
    type: [String, Array],
    default: ''
  },
  linkName: {
    type: String,
    default: '本文其他阅读地址'
  }
})

const LinkConfig = {
  juejin: { name: '稀土掘金', color: '#1e80ff' },
  csdn: { name: 'CSDN', color: '#fc5531' },
  yuque: { name: '语雀', color: '#00b578' },
  weixin: { name: '微信公众号', color: '#07c160' }
}

const linkList = computed(() => {
  if (!props.link) return []
  if (typeof props.link === 'string') return [props.link]
  return props.link
})

// 获取链接
const getLinkUrl = (link: any) => {
  return link.indexOf('::') !== -1 ? link.split('::')[1] : link
}

// 获取链接类型
const getLinkType = (link: any) => {
  return link.indexOf('::') !== -1 ? link.split('::')[0] : 'juejin'
}
// 获取链接名称
const getLinkName = (info: any) => {
  const key = getLinkType(info) || 'juejin'
  return LinkConfig[key]?.name ?? '稀土掘金'
}
// 获取链接颜色
const getLinkColor = (info: any) => {
  const key = getLinkType(info) || 'juejin'
  return LinkConfig[key]?.color ?? '#1e80ff'
}
</script>

<style scoped>
.article-link-info {
  display: flex;
  align-items: center;
  padding: 20px 0;
  /* border-top: 1px solid #eaecef; */
  text-align: left;
  font-size: 16px;
}

.article-link-info a {
  color: #3451b2;
  font-weight: 500;
  padding-left: 5px;
}
.article-link-info-item {
  position: relative;
}

.article-link-info-item + .article-link-info-item {
  margin-left: 20px;
}

.article-link-info-item:not(:last-child)::after {
  content: ' ';
  position: absolute;
  right: -10px;
  height: 100%;
  top: 0;
  width: 1px;
  background-color: #aaa;
}

.green {
  color: rgb(17, 190, 190);
}

.follow-us {
  color: rgb(17, 190, 190);
  font-size: 13px;
  margin-left: 10px;
}

h4 {
  margin-top: 30px;
}

.cursor {
  cursor: pointer;
}
</style>
