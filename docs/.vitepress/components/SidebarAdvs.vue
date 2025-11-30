
/**
 * 侧边栏广告
 */
<template>
  <div>
    <p class="sidebar-advs-placeholder" @click="linkMe">成为赞助商</p>
    <el-carousel v-if="advList.length > 0" class="sidebar-advs" height="90px" :interval="3000"
      indicator-position="outside">
      <el-carousel-item v-for="item in advList" :key="item.imageUrl">
        <img :alt="item.title" :src="`${item.imageUrl}`" @click="handleItemClick(item)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

const advList = ref<any[]>([])

const baseUrl = (import.meta as any).env.VITE_BASE_URL || '/json'

function linkMe() {
  window.open('https://gitee.com/my_spaces/wot-ui-plus')
}

interface AdvItem {
  title: string,
  imageUrl: string,
  link: string,
  hidden: boolean
}

// 获取广告列表
function fetchAdvList() {
  axios.get(`${baseUrl}/advs.json?updateAt=${Date.now()}`).then(({ data }) => {
    const {
      data: { list },
      code
    } = data
    if (code === 0) {
      advList.value = list.filter((item: AdvItem) => !item.hidden)
    }
  })
}

function handleItemClick(item: AdvItem) {
  window.open(item.link)
}

onMounted(() => {
  fetchAdvList()
})
</script>
<style scoped lang="scss">
.sidebar-advs-placeholder {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: var(--vp-c-text-3);
  margin: 7px 0;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  cursor: pointer;
}
</style>
