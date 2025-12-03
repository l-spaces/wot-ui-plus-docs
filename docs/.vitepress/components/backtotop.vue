<!--
 * backtotop.vue
 * 返回顶部按钮组件
 * 
 * 功能：
 * - 显示返回顶部按钮，点击后平滑滚动到页面顶部
 * - 显示滚动进度的圆形指示器
 * - 滚动超过100px时显示，否则隐藏
 * 
 * 使用场景：
 * - 集成在VitePress文档页面中，提供快速返回顶部的功能
 * - 帮助用户在长页面中快速导航
-->
<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from "vue";

const showBackTop = ref(false); // 初始状态设为false
const scrollProgress = ref(0);

// 圆形进度条计算
const radius = 42;
const circumference = computed(() => 2 * Math.PI * radius);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// 使用更高效的节流函数
function throttle(fn, delay = 50) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

const updateScrollProgress = () => {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.documentElement;
  const totalScroll = scrollHeight - innerHeight;
  scrollProgress.value = totalScroll > 0 ? Math.min(scrollY / totalScroll, 1) : 0;
};

const handleScroll = throttle(() => {
  // 当滚动超过100px时显示，否则隐藏
  const shouldShow = window.scrollY > 100;
  showBackTop.value = shouldShow;
  updateScrollProgress();
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  updateScrollProgress();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Transition name="fade">
    <div class="back-top-container" v-show="showBackTop">
      <svg class="progress-ring" viewBox="0 0 100 100">
        <circle class="progress-ring-background" cx="50" cy="50" r="42" />
        <circle class="progress-ring-circle" cx="50" cy="50" r="42"
          :style="{ 'stroke-dashoffset': circumference - (scrollProgress * circumference) }" />
      </svg>
      <div class="vitepress-backTop-main" title="返回顶部" @click="scrollToTop()">
        <svg t="1764780452084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="34237" width="256" height="256">
          <path
            d="M510.866688 227.694839 95.449397 629.218702l235.761562 0-2.057869 328.796468 362.40389 0L691.55698 628.188232l241.942331-3.089361L510.866688 227.694839zM63.840492 63.962777l894.052392 0 0 131.813095L63.840492 195.775872 63.840492 63.962777 63.840492 63.962777zM63.840492 63.962777"
            fill="#ffffff" p-id="34238"></path>
        </svg>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.back-top-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  z-index: 999;
}

.vitepress-backTop-main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #3988d1;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background-color 0.2s ease;
}

.vitepress-backTop-main:hover {
  background-color: #2dcd85;
}

.progress-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  z-index: 1;
}

.progress-ring-background {
  fill: none;
  stroke: rgba(62, 175, 124, 0.15);
  stroke-width: 3;
}

.progress-ring-circle {
  fill: none;
  stroke: #3eaf7c;
  stroke-width: 3;
  stroke-dasharray: 264;
  /* 2 * π * 42 */
  stroke-linecap: round;
  transition: stroke-dashoffset 0.15s ease-out;
}

.icon {
  width: 24px;
  height: 24px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>