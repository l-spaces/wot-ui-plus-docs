/**
 * 首页 站点统计
 */
<template>
  <div class="pv-row container">
    <div class="pv-col">本站总访问量<span id="busuanzi_value_site_pv"></span>次</div>
    <div class="pv-col">本站总访客数<span id="busuanzi_value_site_uv"></span>人</div>
    <div class="pv-col">本文总阅读量<span id="busuanzi_value_page_pv"></span>次</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'


let mapData = [
  { id: 'busuanzi_value_site_pv', key: 'site_pv', offset: 0 },
  { id: 'busuanzi_value_site_uv', key: 'site_uv', offset: 0 },
  { id: 'busuanzi_value_page_pv', key: 'page_pv', offset: 0 }
]

function getValue() {
  let isNext = false
  mapData.forEach(item => {
    const dom = document.getElementById(item.id)
    if (dom && dom.innerHTML) {
      const current = parseInt(dom.innerHTML, 10)
      dom.innerHTML = String(current + item.offset)
    } else {
      isNext = true
    }
  })
  if (isNext) {
    setTimeout(() => {
      updateValue()
    }, 1000) // 1s后再次请求
  }
}

function updateValue() {
  // if ((window as any).bszCaller && (window as any).bszCaller.fetch) {
  //   // 调用统计刷新
  //   (window as any).bszCaller.fetch(
  //     '//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback',
  //     function (data: any) {
  //       mapData.forEach(item => {
  //         const dom = document.getElementById(item.id)
  //         if (dom) {
  //           dom.innerHTML = String(data[item.key] + item.offset)
  //         }
  //       })
  //     }
  //   )
  // }
}

onMounted(() => {
  nextTick(() => {
    getValue()
  })
})

</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1152px;
}

.pv-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  /* padding: 10px; */
}

.pv-col {
  flex: 1;
  text-align: center;
  padding: 20px;
  border: 1px dashed #2979ff;
  border-radius: 5px;
  color: #666;
  min-width: 260px;
}

.pv-col+.pv-col {
  margin-left: 20px;
}

.pv-col span {
  color: #2979ff;
  font-weight: 700;
  padding: 0 5px;
}

@media (max-width: 1000px) {
  .pv-row {
    flex-direction: column;
  }

  .pv-col+.pv-col {
    margin-left: 0;
    margin-top: 20px;
  }
}
</style>
