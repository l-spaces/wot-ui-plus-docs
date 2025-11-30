/**
 * 贡献者
 */
<script setup lang="ts"></script>

<template>
  <div class="contributors">
    <h2>活跃开发者</h2>
    <Developers :type="2"></Developers>
    <h2>Github 贡献名单</h2>
    <a href="https://github.com/anyup/wot-ui-plus/graphs/contributors">
      <img
        alt="Contributors"
        src="https://contrib.rocks/image?repo=anyup/wot-ui-plus"
      />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contributors {
  width: 100%;
}
h2 {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
  position: relative;
  font-weight: 600;
  outline: none;
}
</style>
