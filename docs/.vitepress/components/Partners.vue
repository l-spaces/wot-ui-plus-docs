/**
 * 首页 合作伙伴
 */
<script setup lang="ts">
import { computed } from 'vue'
import VPFeature from 'vitepress/dist/client/theme-default/components/VPFeature.vue'

const data: any[] = [
  // {
  //   icon: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='none' version='1.1' width='512' height='512' viewBox='0 0 512 512'%3E%3Cdefs%3E%3CclipPath id='master_svg0_25_97'%3E%3Crect x='0' y='0' width='512' height='512' rx='0'/%3E%3C/clipPath%3E%3CclipPath id='master_svg1_25_11'%3E%3Crect x='11' y='39' width='490' height='435' rx='0'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg style='mix-blend-mode:passthrough' clip-path='url(%23master_svg0_25_97)'%3E%3Cg clip-path='url(%23master_svg1_25_11)'%3E%3Cg%3E%3Cpath d='M51.4931,294.222767578125L205.214,437.551767578125C211.594,443.498767578125,220.016,446.812767578125,228.778,446.812767578125C237.54,446.812767578125,245.962,443.498767578125,252.342,437.551767578125L254.554,435.512767578125C238.306,411.638767578125,228.778,382.751767578125,228.778,351.655767578125C228.778,269.073767578125,295.812,202.124767578125,378.5,202.124767578125C402.575,202.124767578125,425.288,207.817767578125,445.45,217.842767578125C446.215,212.320767578125,446.556,206.797767578125,446.556,201.19076757812502L446.556,196.262767578125C446.556,136.874967578125,403.595,86.238267578125,344.983,76.467747578125C306.191,70.010717578125,266.719,82.669897578125,238.986,110.36716757812499L228.778,120.562467578125L218.569,110.36716757812499C190.837,82.669897578125,151.365,70.010717578125,112.573,76.467747578125C53.9601,86.238267578125,11,136.874967578125,11,196.262767578125L11,201.19076757812502C11,236.448767578125,25.6319,270.17876757812496,51.4931,294.222767578125ZM378.5,473.999767578125C446.13,473.999767578125,501,419.199767578125,501,351.655767578125C501,284.112767578125,446.13,229.312767578125,378.5,229.312767578125C310.87,229.312767578125,256,284.112767578125,256,351.655767578125C256,419.199767578125,310.87,473.999767578125,378.5,473.999767578125Z' fill='%232B9939' fill-opacity='1'/%3E%3C/g%3E%3Cg style='mix-blend-mode:passthrough'%3E%3Cpath d='M322,415L441,415L441,293.5L419,293.5L419,393L344.5,393L344.5,293.5L322,293.5L322,415Z' fill='%23FFFFFF' fill-opacity='1'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
  //   title: 'Uni Helper',
  //   details: 'Uni Helper 旨在增强 uni-app 系列产品的开发体验，为 uni-app 开发者点亮一盏灯。',
  //   link: 'https://uni-helper.js.org/'
  // },
  // {
  //   icon: "data:image/svg+xml;utf8,%3Csvg id='_图层_2' data-name='图层 2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 113.39 113.39'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3Anone%3B%7D.cls-2%7Bfill%3A%23d14328%3B%7D.cls-3%7Bfill%3A%232c8d3a%3B%7D%3C/style%3E%3C/defs%3E%3Cg id='_图层_1-2' data-name='图层 1'%3E%3Cg%3E%3Crect class='cls-1' width='113.39' height='113.39'/%3E%3Cg%3E%3Cpath class='cls-3' d='M86.31,11.34H25.08c-8.14,0-14.74,6.6-14.74,14.74v61.23c0,8.14,6.6,14.74,14.74,14.74h61.23c.12,0,.24-.02,.37-.02-9.76-.2-17.64-8.18-17.64-17.99,0-.56,.03-1.12,.08-1.67H34.1c-1.57,0-2.83-1.27-2.83-2.83V32.43c0-.78,.63-1.42,1.42-1.42h9.17c.78,0,1.42,.63,1.42,1.42v36.52c0,.78,.63,1.42,1.42,1.42h22.02c.78,0,1.42-.63,1.42-1.42V32.43c0-.78,.63-1.42,1.42-1.42h9.17c.78,0,1.42,.63,1.42,1.42v34.99c2.13-.89,4.47-1.39,6.92-1.39,5.66,0,10.7,2.63,14.01,6.72V26.08c0-8.14-6.6-14.74-14.74-14.74Z'/%3E%3Cg%3E%3Cpath class='cls-2' d='M87.04,68.03c-8.83,0-16.01,7.18-16.01,16.01s7.18,16.01,16.01,16.01,16.01-7.18,16.01-16.01-7.18-16.01-16.01-16.01Zm-.27,24.84h-7.2v-3h1.18v-10.48h4.58v2.81h1.42c.84,0,1.46-.16,1.88-.48s.62-.87,.62-1.64c0-.69-.25-1.17-.74-1.45s-1.19-.42-2.09-.42h-6.84v-3h7.2c2.38,0,4.15,.38,5.31,1.15,1.16,.77,1.74,1.93,1.74,3.48,0,1.71-.83,2.93-2.5,3.64,1.07,.4,1.87,.95,2.39,1.65s.79,1.56,.79,2.58c0,3.44-2.58,5.16-7.73,5.16Z'/%3E%3Cpath class='cls-2' d='M86.49,85.17h-1.16v4.7h1.8c.81,0,1.46-.18,1.94-.55s.72-.95,.72-1.73c0-.86-.25-1.48-.74-1.85s-1.35-.56-2.56-.56Z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
  //   title: 'unibest',
  //   details:
  //     '最好的 uniapp 开发模板，使用 VSCode + TS + Vite4 + UnoCss 构建，使用了最新的前端技术栈。',
  //   link: 'https://unibest.tech'
  // }
]

const links = computed(() => {
  return data
})

const grid = computed(() => {
  const length = links.value.length || 0
  if (!length) {
    return
  } else {
    return 'grid-3'
  }
})
</script>

<template>
  <div class="container">
    <h1 class="friendly-title">合作伙伴</h1>

    <div class="items">
      <div
        v-for="feature in links"
        :key="feature.title"
        class="item"
        :class="[grid]"
      >
        <VPFeature
          :icon="{ src: feature.icon, height: '48px', width: 'auto' }"
          :title="feature.title"
          :details="feature.details"
          :link="feature.link"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.VPImage) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  /* background-color: var(--vp-c-default-soft); */
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.friendly-title {
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
  font-size: 24px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 100%;
}

@media (min-width: 640px) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 960px) {
  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
  .item.grid-4 {
    width: calc(100% / 4);
  }
}
</style>
