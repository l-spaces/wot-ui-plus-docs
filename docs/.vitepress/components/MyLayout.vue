<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import HomePage from './HomePage.vue'
import TipsDialog from './TipsDialog.vue'
import HomeStar from './HomeStar.vue'
import AdsRightAside from './AdsRightAside.vue'
import TipsTop from './TipsTop.vue'
import BackTop from './BackTop.vue'
import AdsLeftAside from './AdsLeftAside.vue'
import HomeVersion from './HomeVersion.vue'
import AdsHome from './AdsHome.vue'

import { ElNotification } from 'element-plus'

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

    <template #home-hero-info-before>
      <HomeUnderline />
    </template>
    <template #home-hero-info-after>
      <HomeStar />
    </template>

    <template #home-hero-actions-after>
    </template>

    <!-- 广告位 -->
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
    <!-- end 总是启用 -->

    <!-- start 当 layout: 'doc' (默认) 在 frontmatter 中被启用时 -->
    <!-- 菜单栏前置内容 -->
    <template #sidebar-nav-before>
      <AdsLeftAside />
    </template>
    <!-- 侧边栏内容后置内容 -->
    <template #aside-outline-after>
      <AdsRightAside />
    </template>
    <!-- end 当 layout: 'doc' (默认) 在 frontmatter 中被启用时 -->

  </DefaultTheme.Layout>
</template>
