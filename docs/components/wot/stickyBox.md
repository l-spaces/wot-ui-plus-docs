# StickyBox 吸顶容器
<demo-model url="/subPages/stickyBox/Index"></demo-model>

## 组件概况

### 组件概述
StickyBox 是吸顶容器组件，用于包裹多个 Sticky 组件，实现多个吸顶元素的堆叠效果。它会自动管理内部吸顶元素的位置和层级，确保吸顶元素在滚动时正确堆叠，适用于需要多个吸顶元素的场景。

### 详细功能描述
- 支持包裹多个 Sticky 组件
- 自动管理内部吸顶元素的位置和层级
- 实现多个吸顶元素的正确堆叠效果
- 自动监听容器大小变化，适应动态内容
- 支持自定义样式和类名
- 跨平台兼容

### 适用业务场景
- 多级导航栏吸顶
- 多个筛选条件吸顶
- 复杂页面的多个吸顶元素
- 任何需要多个吸顶元素堆叠的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有对外暴露的事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 用于放置 Sticky 组件，实现多个吸顶元素的堆叠效果 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="sticky-box-demo">
    <wd-sticky-box>
      <view class="content">
        <view v-for="item in 20" :key="item" class="item">
          <text>{{ item }}</text>
        </view>
        <wd-sticky>
          <view class="sticky-item">
            第一个吸顶元素
          </view>
        </wd-sticky>
        <view v-for="item in 20" :key="item" class="item">
          <text>{{ item }}</text>
        </view>
        <wd-sticky>
          <view class="sticky-item">
            第二个吸顶元素
          </view>
        </wd-sticky>
        <view v-for="item in 40" :key="item" class="item">
          <text>{{ item }}</text>
        </view>
      </view>
    </wd-sticky-box>
  </view>
</template>

<script lang="ts" setup>
// 基础吸顶容器用法
</script>

<style scoped>
.sticky-box-demo {
  padding: 20rpx;
}

.content {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  padding: 20rpx;
}

.item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.sticky-item {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #1989fa;
  color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}
</style>
```

### 2. 自定义样式

```vue
<template>
  <view class="sticky-box-demo">
    <wd-sticky-box customStyle="background-color: #f0f9ff; padding: 20rpx; border-radius: 16rpx;">
      <view class="content">
        <view v-for="item in 20" :key="item" class="item">
          <text>{{ item }}</text>
        </view>
        <wd-sticky>
          <view class="sticky-item">
            自定义样式吸顶容器
          </view>
        </wd-sticky>
        <view v-for="item in 40" :key="item" class="item">
          <text>{{ item }}</text>
        </view>
      </view>
    </wd-sticky-box>
  </view>
</template>

<script lang="ts" setup>
// 自定义样式吸顶容器
</script>

<style scoped>
.sticky-box-demo {
  padding: 20rpx;
}

.content {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
}

.item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.sticky-item {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #4caf50;
  color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}
</style>
```

### 3. 多级导航吸顶

```vue
<template>
  <view class="sticky-box-demo">
    <wd-sticky-box>
      <view class="page-header">
        <text class="page-title">多级导航吸顶</text>
      </view>
      
      <!-- 一级导航 -->
      <wd-sticky>
        <view class="nav-level-1">
          <view 
            v-for="nav1 in navLevel1" 
            :key="nav1"
            class="nav-item nav-item-1"
            :class="{ active: activeNav1 === nav1 }"
            @click="activeNav1 = nav1"
          >
            <text>{{ nav1 }}</text>
          </view>
        </view>
      </wd-sticky>
      
      <view v-for="item in 20" :key="item" class="item">
        <text>内容 {{ item }}</text>
      </view>
      
      <!-- 二级导航 -->
      <wd-sticky>
        <view class="nav-level-2">
          <view 
            v-for="nav2 in navLevel2" 
            :key="nav2"
            class="nav-item nav-item-2"
            :class="{ active: activeNav2 === nav2 }"
            @click="activeNav2 = nav2"
          >
            <text>{{ nav2 }}</text>
          </view>
        </view>
      </wd-sticky>
      
      <view v-for="item in 40" :key="item" class="item">
        <text>{{ activeNav1 }} - {{ activeNav2 }} - 内容 {{ item }}</text>
      </view>
    </wd-sticky-box>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const navLevel1 = ['推荐', '热门', '最新', '关注']
const navLevel2 = ['全部', '视频', '图文', '问答']

const activeNav1 = ref(navLevel1[0])
const activeNav2 = ref(navLevel2[0])
</script>

<style scoped>
.sticky-box-demo {
  padding: 0;
}

.page-header {
  height: 200rpx;
  background-color: #1989fa;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
}

.nav-level-1 {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #ebedf0;
}

.nav-level-2 {
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1rpx solid #ebedf0;
}

.nav-item {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 28rpx;
  color: #606266;
  position: relative;
}

.nav-item.active {
  color: #1989fa;
}

.nav-item-1.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #1989fa;
  border-radius: 2rpx;
}

.nav-item-2.active {
  background-color: rgba(25, 137, 250, 0.1);
}

.item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #fff;
  border-bottom: 1rpx solid #ebedf0;
}
</style>
```

### 4. 筛选条件吸顶

```vue
<template>
  <view class="sticky-box-demo">
    <wd-sticky-box>
      <view class="page-header">
        <text class="page-title">商品列表</text>
      </view>
      
      <!-- 排序筛选 -->
      <wd-sticky>
        <view class="filter-bar">
          <wd-sort-button title="综合" v-model="sortType"></wd-sort-button>
          <wd-sort-button title="销量" v-model="salesSort"></wd-sort-button>
          <wd-sort-button title="价格" v-model="priceSort"></wd-sort-button>
          <wd-sort-button title="筛选" v-model="filterSort"></wd-sort-button>
        </view>
      </wd-sticky>
      
      <!-- 分类筛选 -->
      <wd-sticky>
        <view class="category-bar">
          <view 
            v-for="category in categories" 
            :key="category"
            class="category-item"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            <text>{{ category }}</text>
          </view>
        </view>
      </wd-sticky>
      
      <view class="product-list">
        <view v-for="item in 50" :key="item" class="product-item">
          <text class="product-name">商品 {{ item }}</text>
          <text class="product-price">¥ {{ (Math.random() * 1000).toFixed(2) }}</text>
        </view>
      </view>
    </wd-sticky-box>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortType = ref(0)
const salesSort = ref(0)
const priceSort = ref(0)
const filterSort = ref(0)

const categories = ['全部', '手机', '电脑', '家电', '服装', '食品', '美妆', '家居']
const activeCategory = ref(categories[0])
</script>

<style scoped>
.sticky-box-demo {
  padding: 0;
}

.page-header {
  height: 150rpx;
  background-color: #ff6b6b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
}

.filter-bar {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #ebedf0;
}

.category-bar {
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1rpx solid #ebedf0;
  overflow-x: auto;
  white-space: nowrap;
}

.category-item {
  display: inline-block;
  padding: 0 30rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 28rpx;
  color: #606266;
}

.category-item.active {
  color: #1989fa;
  background-color: rgba(25, 137, 250, 0.1);
}

.product-list {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.product-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-size: 28rpx;
  color: #303133;
}

.product-price {
  font-size: 32rpx;
  color: #ff6b6b;
  font-weight: bold;
}
</style>
```

### 5. 动态内容吸顶容器

```vue
<template>
  <view class="sticky-box-demo">
    <wd-sticky-box>
      <view class="control-bar">
        <wd-button size="small" @click="addSticky">添加吸顶元素</wd-button>
        <wd-button size="small" type="warning" @click="removeSticky">移除吸顶元素</wd-button>
        <text class="sticky-count">当前吸顶元素数量: {{ stickyCount }}</text>
      </view>
      
      <view v-for="item in 20" :key="item" class="item">
        <text>初始内容 {{ item }}</text>
      </view>
      
      <wd-sticky v-for="index in stickyCount" :key="index">
        <view class="dynamic-sticky" :style="{ backgroundColor: getRandomColor() }">
          <text>动态吸顶元素 {{ index }}</text>
        </view>
      </wd-sticky>
      
      <view v-for="item in 40" :key="item" class="item">
        <text>后续内容 {{ item }}</text>
      </view>
    </wd-sticky-box>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const stickyCount = ref(2)

const addSticky = () => {
  if (stickyCount.value < 5) {
    stickyCount.value++
  }
}

const removeSticky = () => {
  if (stickyCount.value > 1) {
    stickyCount.value--
  }
}

const getRandomColor = () => {
  const colors = ['#1989fa', '#4caf50', '#ff9800', '#f44336', '#9c27b0']
  return colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style scoped>
.sticky-box-demo {
  padding: 20rpx;
}

.control-bar {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: #f0f9ff;
  border-radius: 12rpx;
}

.sticky-count {
  font-size: 28rpx;
  color: #606266;
  margin-left: auto;
}

.item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.dynamic-sticky {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <view class="sticky-box-demo">
    <wd-sticky-box 
      customStyle="background-color: #f0f9ff; padding: 20rpx; border-radius: 16rpx; box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);"
    >
      <!-- 内容 -->
    </wd-sticky-box>
  </view>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <view class="sticky-box-demo">
    <wd-sticky-box customClass="my-sticky-box">
      <!-- 内容 -->
    </wd-sticky-box>
  </view>
</template>

<script lang="ts" setup>
// 自定义类名示例
</script>

<style scoped>
:deep(.my-sticky-box) {
  background-color: #f0f9ff;
  padding: 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. **组件关系**：StickyBox 组件主要用于包裹 Sticky 组件，单独使用没有实际意义。

2. **多个吸顶元素**：当需要实现多个吸顶元素时，建议使用 StickyBox 组件包裹，以实现正确的堆叠效果。

3. **性能优化**：组件内部使用了 IntersectionObserver API 监听元素位置变化，性能较高，但在大量使用时仍需注意性能影响。

4. **跨平台兼容性**：组件在 H5、App 和小程序平台表现一致，但在 H5 平台会自动计算导航栏高度。

5. **布局注意**：StickyBox 组件的父容器应避免使用 `overflow: hidden` 或 `position: relative` 等可能影响吸顶效果的样式。

6. **内容大小**：StickyBox 组件会自动适应内部内容大小，无需手动设置高度。

7. **样式继承**：customStyle 和 customClass 会应用到 StickyBox 组件的根节点上，可以通过穿透选择器修改内部样式。

8. **初始化位置**：组件会在初始化时计算元素位置，确保初始状态正确。

9. **吸顶顺序**：Sticky 组件在 StickyBox 中的顺序决定了吸顶时的堆叠顺序，后面的 Sticky 组件会堆叠在前面的 Sticky 组件之上。

10. **嵌套限制**：不建议在 StickyBox 组件内部嵌套其他 StickyBox 组件，可能会导致吸顶效果异常。