# 交流反馈

如果有问题推荐使用 `Github`  反馈，如果使用 `Github` 等平台无法解决你的问题，可以加群，请确保你的提问清晰明了，用词礼貌文明，非常感谢你的支持！


# 案例

非常欢迎大家一起贡献优秀的 Demo 与案例，欢迎在此 [issue](https://github.com/l-spaces/wot-ui-plus/issues) 提交案例。

<div class="cases-container">
  <el-card v-for="(item, index) in cases" :key="index" shadow="hover">
    <template #header>
      <span class="case-title">{{ item.name }}</span>
      <span class="case-description">{{ item.description }}</span>
    </template>
    <el-image :src="item.image" />
  </el-card>
</div>

<style scoped>
.cases-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.case-title {
  font-size: 18px;
  font-weight: 500;
}

.case-description {
  margin-left: 10px;
  font-size: 14px;
  color: #999;
}

:deep(.el-card__body .el-image) {
  width: 100%;
  border-radius: 4px;
}
</style>

<script setup>
</script>
