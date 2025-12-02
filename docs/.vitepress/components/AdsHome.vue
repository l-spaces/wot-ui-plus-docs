<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const baseUrl = (import.meta as any).env.VITE_BASE_URL || '/json'

enum AdvType {
  Super = 'super',
  Gold = 'gold'
}

interface AdvItem {
  type: AdvType,
  title: string,
  imageUrl: string,
  link: string,
  hidden: boolean
}

const advData = ref<AdvItem[]>([])

// 2. 辅助函数：将type（如super/gold）转换为标题格式（首字母大写）
const formatTypeToTitle = (type: AdvType) => {
  return type === AdvType.Super ? '铂金赞助商' : '钻石赞助商'
}

function fetchAdvList() {
  axios.get(`${baseUrl}/sponsor.json?updateAt=${Date.now()}`).then(({ data }) => {
    const { data: list, code } = data
    advData.value = list.filter((item: { hidden: any }) => !item.hidden)
  })
}

const superSponsors = computed(() => {
  return advData.value?.filter(sponsor => sponsor.type === AdvType.Super)
})

// 金牌赞助
const goldSponsors = computed(() => {
  return advData.value?.filter(sponsor => sponsor.type === AdvType.Gold)
})

onMounted(() => {
  fetchAdvList()
})

</script>
<template>
  <div class="container">
    <div class="VPHomeSponsor vp-sponsor-section">
      <div class="vp-sponsor-group">
        <h3 class="vp-sponsor-section-title"> 铂金赞助商 </h3>
        <el-row :gutter="20" justify="center">
          <el-col :span="8" v-for="item in superSponsors" :key="item.title" style="padding: 10px;">
            <a :href="item.link" target="_blank">
              <div class="vp-sponsor-item" :class="`vp-sponsor-${item.type}`">

                <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="vp-sponsor-img" loading="lazy">
                <div class="vp-sponsor-name">{{ item.title }}</div>
              </div>
            </a>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="vp-sponsor-group">
      <h3 class="vp-sponsor-section-title"> 钻石赞助商 </h3>
      <el-row :gutter="10" justify="center">
        <el-col :span="4" v-for="item in goldSponsors" :key="item.title" style="padding: 10px;">
          <a :href="item.link" target="_blank">
            <div class="vp-sponsor-item" :class="`vp-sponsor-${item.type}`">
              <img :src="item.imageUrl" :alt="item.title" class="vp-sponsor-img" loading="lazy">
              <div class="vp-sponsor-name">{{ item.title }}</div>
            </div>
          </a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1152px;
  text-align: center;
}

// 赞助商区域整体样式
.vp-sponsor-section {
  width: 100%;
}

.vp-sponsor-group {
  margin-bottom: 2.5rem;
}

.vp-sponsor-section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

// 单个赞助商项样式
.vp-sponsor-item {
  // 内部元素垂直排列并居中
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 130px;
  padding: 5px;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: var(--vp-c-bg-soft);
    border: 1px solid #000;
  }
}

// 赞助商图片样式
.vp-sponsor-img {
  height: 64px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

// 赞助商名称样式
.vp-sponsor-name {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

// 不同类型赞助商的差异化样式
.vp-sponsor-super {
  border: 1px solid var(--vp-c-brand);
}

.vp-sponsor-gold {
  border: 1px dashed var(--vp-c-yellow);
}

// 响应式调整
@media (max-width: 768px) {
  .vp-sponsor-item {
    padding: 1rem;
  }
}
</style>