
/**
 * 页面模板下载提示块组件
 */
<template>
  <div class="custom-block custom-block-for-no-api">
    <div class="custom-block tip">
      <p class="custom-block-title">提示</p>
      <p>
        页面模板源码免费开源，在uni-app的插件市场wot-ui-plus的
        <a
          style="color: #409eff !important"
          target="_blank"
          href="https://ext.dcloud.net.cn/plugin?id=24633"
        >
          示例项目
        </a>
        中，在右上角选择"使用 HBuilderX 导入示例项目" 或者 "下载示例项目ZIP"，
        在VSCode/HX中运行项目即可看到和使用模板。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面模板下载提示块组件，支持自定义提示文本
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.custom-block.tip {
  background-color: #f3f5f7;
  border-color: #42b983;
}

.custom-block .custom-block-title {
  margin-bottom: -0.5rem !important;
}

.custom-block .custom-block-title {
  font-weight: 600;
  margin-bottom: -0.4rem;
}
</style>
