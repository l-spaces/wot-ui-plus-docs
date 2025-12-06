<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import HomePage from './HomePage.vue'
import TipsDialog from './TipsDialog.vue'
import HomeStar from './HomeStar.vue'
import AdsRightAside from './AdsRightAside.vue'
import TipsTop from './TipsTop.vue'
import BackTop from './BackTop.vue'
import AdsLeftAside from './AdsLeftAside.vue'
import HomeUnderline from './HomeUnderline.vue'
import HomeVersion from './HomeVersion.vue'
import AdsHome from './AdsHome.vue'
import DemoModel from './DemoModel.vue'
import DemoPreview from './DemoPreview.vue'
import DemoIframe from './DemoIframe.vue'

import { ElNotification } from 'element-plus'

const route = useRoute()

const { isDark } = useData()
const tipsRef = ref()


function enableTransitions() {
  return (
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  )
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 1000,
      easing: 'ease-in',
      fill: 'forwards',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

const open = () => {
  ElNotification({
    title: '📢注意',
    offset: 50,
    dangerouslyUseHTMLString: true,
    message: '<strong>💡 此文档由 <i style="color: #409eff;">AI</i> 生成，如有问题，请可联系作者。<br/>🔔<a style="color: #E4080A;text-decoration:underline" href="https://github.com/l-spaces/wot-ui-plus-docs/issues" target="_blank">点击反馈</a>🤝</strong>',
    type: 'primary',
    showClose: false,
    duration: 10000,
  })
}

const isComponent = computed(() => 
  route.path.includes('/components/wot') && !route.path.includes('/use-')
)

onMounted(() => {
  open()
  // setInterval(() => {
  //   open();
  // }, 60000 * 5);
});

onUnmounted(() => {
});
</script>

<template>
  <DefaultTheme.Layout>

    <!-- 导航栏LOGO前置内容 -->
    <template #nav-bar-title-before>
    </template>
    <!-- 导航栏LOGO后置内容 -->
    <template #nav-bar-title-after>
      <HomeVersion />
    </template>
    <!-- 导航栏内容后置内容 -->
    <template #nav-bar-content-after>
      <!-- <TipsDialog :tips-key="['release', 'support']" ref="tipsRef" /> -->
      <!-- 导航栏消息中心 -->
      <!-- <MessageBox @click-tips="tipsRef.showDialog($event)" /> -->
    </template>
    <!-- 首页字体下划线 -->
    <template #home-hero-info-before>
      <HomeUnderline />
    </template>
    <template #home-hero-info-after>
      <HomeStar />
    </template>

    <template #home-hero-actions-after>
    </template>

    <!-- 首页广告位 -->
    <template #home-hero-after>
      <AdsHome />
    </template>
    <template #home-features-before>
    </template>

    <template #home-features-after>
      <HomePage />
    </template>

    <template #doc-footer-before>
      <BackTop />
    </template>
    <!-- 布局顶部内容 -->
    <template #layout-top>
      <!-- <TipsTop /> -->
    </template>

    <!-- start 当 layout: 'doc' (默认) 在 frontmatter 中被启用时 -->
    <!-- 菜单栏广告位 -->
    <template #sidebar-nav-before>
      <AdsLeftAside />
    </template>
    <!-- 侧边栏广告位 -->
    <template #aside-outline-after>
      <AdsRightAside />
    </template>
    <template #aside-ads-before>
    </template>
    <!-- end 当 layout: 'doc' (默认) 在 frontmatter 中被启用时 -->

  </DefaultTheme.Layout>
</template>
