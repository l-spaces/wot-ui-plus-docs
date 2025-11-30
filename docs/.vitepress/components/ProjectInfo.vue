/** * 项目信息 */
<template>
  <div class="project-info">
    <div class="card-group blue">
      <div class="card-group-title primary">开源项目 wot-ui-plus</div>
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>uni-app Vue3 快速开发工具库</span>
          </div>
        </template>
        <p>
          简介：wot-ui-plus，是全面支持 Vue3.0、TypeScript 的 uni-app
          生态框架，wot-ui-plus 的基线版本是基于 uView 1.8.8 修改，使用
          TypeScript 完全重构，目前已全面支持 uni-app Vue3.0。
        </p>
        <template #footer>
          <DemoScan type="0" border-color="#c6e2ff"></DemoScan>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemoScan from './DemoScan.vue'
</script>

<style scoped>
.card-group {
  margin: 40px 0;
}
.card-group-title {
  position: relative;
  padding-left: 15px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 20px 0;
  color: #606060;
  line-height: 30px;
}

.gray .card-group-title {
  color: #666666 !important;
}

.gray .card-group-title::after {
  background-color: #666666 !important;
}

.blue .card-group-title {
  color: #2979ff !important;
}

.blue .card-group-title::after {
  background-color: #2979ff !important;
}

.green .card-group-title {
  color: #67c23a !important;
}

.green .card-group-title::after {
  background-color: #67c23a !important;
}

.yellow .card-group-title {
  color: #e6a23c !important;
}

.yellow .card-group-title::after {
  background-color: #e6a23c !important;
}

.card-group-title::after {
  position: absolute;
  content: '';
  top: 0;
  width: 5px;
  height: 30px;
  left: 0;
  border-radius: 10px;
  background-color: #606060;
}

.project-info p {
  font-size: 14px;
}

.gray .el-card {
  --el-card-border-color: #e6e6e6;
  background-color: #f6f6f6;
}

.blue .el-card {
  --el-card-border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.green .el-card {
  --el-card-border-color: #d2edc4;
  background-color: #f0f9ec;
}

.yellow .el-card {
  --el-card-border-color: #f8e3c5;
  background-color: #fdf6ec;
}
</style>
