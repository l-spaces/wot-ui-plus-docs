
/**
 * 首页 项目统计
 */
<script setup lang="ts"></script>

<template>
  <p class="home-star">
    <a href="https://gitee.com/my_spaces/wot-ui-plus" target="_blank" rel="noopener noreferrer">
      <img
        alt="Gitee Repo stars"
        src="https://gitee.com/my_spaces/wot-ui-plus/badge/star.svg"
      />
    </a>

    <a href="https://github.com/l-spaces/wot-ui-plus" target="_blank" rel="noopener noreferrer">
      <img
        alt="GitHub Repo stars"
        src="https://img.shields.io/github/stars/l-spaces/wot-ui-plus?logo=github&color=%234d80f0&link=https%3A%2F%2Fgithub.com%2Fl-spaces%2Fwot-ui-plus&style=flat-square"
      />
    </a>

    <a href="https://www.npmjs.com/package/wot-ui-plus" target="_blank" rel="noopener noreferrer">
      <img
        alt="npm"
        src="https://img.shields.io/npm/v/wot-ui-plus?logo=npm&color=%234d80f0&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwot-ui-plus&style=flat-square"
      />
    </a>

    <a href="https://www.npmjs.com/package/wot-ui-plus" target="_blank" rel="noopener noreferrer">
      <img
        alt="npm"
        src="https://img.shields.io/npm/dm/wot-ui-plus?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwot-ui-plus&style=flat-square"
      />
    </a>
  </p>
</template>

<style scoped>
.home-star {
  display: flex;
  align-items: center;
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
@media (min-width: 640px) {
  .home-star {
    justify-content: center;
  }
}

@media (min-width: 960px) {
  .home-star {
    justify-content: start;
  }
}
</style>
