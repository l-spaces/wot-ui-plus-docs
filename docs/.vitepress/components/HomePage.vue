
/**
 * 首页
 */
<template>
  <div class="home-page VPFeatures VPHomeFeatures">
    <!-- <Contributors /> -->
    <!-- <ProjectInfo /> -->
    <Partners />
    <!-- <SitePV /> -->
    <!-- <FooterInfo /> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-page {
  margin-top: 50px;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .home-page {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .home-page {
    padding: 0 64px;
  }
}

</style>
