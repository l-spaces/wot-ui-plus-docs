<script setup lang="ts">
import { onMounted, ref } from 'vue'
import advList from './../../public/json/l-sponsor.json'
import axios from 'axios'

const data = ref<any[]>([])

const baseUrl = '/wot-ui-plus-docs/json/l-sponsor.json'

function linkMe() {
  window.open('https://gitee.com/my_spaces/wot-ui-plus')
}

interface AdvItem {
  title: string,
  img: string,
  link: string,
  hidden: boolean
}

// 获取广告列表
function fetchAdvList() {
  data.value = advList.data.filter((item: AdvItem) => !item.hidden)
  // axios.get(`${baseUrl}?updateAt=${Date.now()}`).then(({ data }) => {
  //   const {
  //     data: { list },
  //     code
  //   } = data
  //   if (code === 0) {
  //     advList.value = list.filter((item: AdvItem) => !item.hidden)
  //   }
  // })
}

function handleItemClick(item: AdvItem) {
  window.open(item.link)
}

onMounted(() => {
  fetchAdvList()
})
</script>
<template>
  <div>
    <p class="sidebar-advs-placeholder" @click="linkMe">赞助商</p>
    <el-carousel v-if="data.length > 0" class="sidebar-advs" height="90px" :interval="3000"
      indicator-position="outside">
      <el-carousel-item v-for="item in data" :key="item.title">
        <div class="sponsor-item">
          <img class="sponsor-image" :alt="item.title" :src="`${item.img}`" fit="contain" @click="handleItemClick(item)" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.sidebar-advs-placeholder {
  font-size: 14px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: var(--vp-c-text-3);
  margin: 5px 0;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  cursor: pointer;
}
</style>
