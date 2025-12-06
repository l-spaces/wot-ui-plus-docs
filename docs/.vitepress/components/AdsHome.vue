<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import advList from './../../public/json/h-sponsor.json'
import axios from 'axios'

const baseUrl = '/wot-ui-plus-docs/json/h-sponsor.json'

const data = ref<any[]>([])

function fetchAdvList() {
  data.value = advList.data
  // axios.get(`${baseUrl}?updateAt=${Date.now()}`).then(({ data }) => {
  //   const { data: list, code } = data
  //   data.value = list.filter((item: { hidden: any }) => !item.hidden)
  // })
}

// 分离超级赞助和金牌赞助
const superSponsors = computed(() => {
  return data.value?.find(sponsor => sponsor.tier === 'Platinum')
})

const goldSponsors = computed(() => {
  return data.value?.find(sponsor => sponsor.tier === 'Gold')
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
        <el-row :gutter="20" justify="center" v-if="superSponsors?.items.length">
          <el-col :span="8" v-for="item in superSponsors.items" :key="item.name" style="padding: 10px;">
            <a :href="item.url" target="_blank">
              <div class="vp-sponsor-item" :class="`vp-sponsor-${item.type}`">
                <img v-if="item.img" :src="item.img" :alt="item.name" class="vp-sponsor-img" loading="lazy">
                <div class="vp-sponsor-name">{{ item.name }}</div>
              </div>
            </a>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="vp-sponsor-group">
      <h3 class="vp-sponsor-section-title"> 钻石赞助商 </h3>
      <el-row :gutter="10" justify="center" v-if="goldSponsors?.items.length">
        <el-col :span="4" v-for="item in goldSponsors.items" :key="item.name" style="padding: 10px;">
          <a :href="item.url" target="_blank">
            <div class="vp-sponsor-item" :class="`vp-sponsor-${item.type}`">
              <img v-if="item.img" :src="item.img" :alt="item.name" class="vp-sponsor-img" loading="lazy">
              <div class="vp-sponsor-name">{{ item.name }}</div>
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
  // color: var(--vp-c-text-2);
  text-align: center;
  background-image: -webkit-linear-gradient(120deg, var(--zdy-6) 20%, var(--zdy-3));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

// 不同类型赞助商的差异化样式
.vp-sponsor-super {
  // border: 1px solid var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.dark .vp-sponsor-super {
  background-color: var(--vp-c-bg-soft);
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