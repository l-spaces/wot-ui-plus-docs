# IndexBar 索引栏

<demo-model url="/subPages/indexBar/Index"></demo-model>


## 组件概况

### 组件概述
IndexBar 是一个用于实现带有侧边索引的列表组件，通常与 IndexAnchor 组件配合使用。它提供了一个可点击的侧边索引栏，用户可以通过点击或滑动索引来快速定位到列表中的对应位置。IndexBar 支持吸顶效果，当滚动到对应位置时，会自动高亮显示当前锚点。

### 核心功能
- 提供侧边索引栏，支持点击和滑动操作
- 自动识别子组件 IndexAnchor
- 支持锚点吸顶效果
- 支持自动高亮当前激活的索引
- 支持触摸滑动索引导航

### 适用业务场景
- 通讯录联系人列表
- 城市选择器
- 分类索引列表
- 字母索引列表
- 带有层级索引的长列表

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| sticky | boolean | false | 否 | 索引是否吸顶 |

### Events
IndexBar 组件本身不直接触发事件。

### Methods
IndexBar 组件不直接对外暴露方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置 IndexAnchor 组件和列表内容 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="A"></wd-index-anchor>
    <view class="list-item" v-for="i in 10" :key="i">列表项A{{ i }}</view>
    
    <wd-index-anchor index="B"></wd-index-anchor>
    <view class="list-item" v-for="i in 10" :key="i">列表项B{{ i }}</view>
    
    <wd-index-anchor index="C"></wd-index-anchor>
    <view class="list-item" v-for="i in 10" :key="i">列表项C{{ i }}</view>
    
    <wd-index-anchor index="D"></wd-index-anchor>
    <view class="list-item" v-for="i in 10" :key="i">列表项D{{ i }}</view>
  </wd-index-bar>
</template>

<style scoped>
.list-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
}
</style>
```

### 带吸顶效果

```vue
<template>
  <wd-index-bar :sticky="true">
    <wd-index-anchor index="1"></wd-index-anchor>
    <view class="section-content">
      <view class="list-item" v-for="i in 15" :key="i">分类1-{{ i }}</view>
    </view>
    
    <wd-index-anchor index="2"></wd-index-anchor>
    <view class="section-content">
      <view class="list-item" v-for="i in 15" :key="i">分类2-{{ i }}</view>
    </view>
    
    <wd-index-anchor index="3"></wd-index-anchor>
    <view class="section-content">
      <view class="list-item" v-for="i in 15" :key="i">分类3-{{ i }}</view>
    </view>
  </wd-index-bar>
</template>

<style scoped>
.section-content {
  background-color: #fff;
}

.list-item {
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
}
</style>
```

### 城市选择器

```vue
<template>
  <wd-index-bar :sticky="true">
    <wd-index-anchor index="热门">
      <view class="hot-cities">
        <view class="city-tag" v-for="city in hotCities" :key="city">{{ city }}</view>
      </view>
    </wd-index-anchor>
    
    <wd-index-anchor index="A"></wd-index-anchor>
    <view class="city-item" v-for="city in cities.A" :key="city">{{ city }}</view>
    
    <wd-index-anchor index="B"></wd-index-anchor>
    <view class="city-item" v-for="city in cities.B" :key="city">{{ city }}</view>
    
    <wd-index-anchor index="C"></wd-index-anchor>
    <view class="city-item" v-for="city in cities.C" :key="city">{{ city }}</view>
    
    <!-- 更多城市... -->
  </wd-index-bar>
</template>

<script setup lang="ts">
const hotCities = ['北京', '上海', '广州', '深圳', '杭州', '成都']

const cities = {
  A: ['安庆', '安阳', '鞍山'],
  B: ['北京', '保定', '包头', '滨州'],
  C: ['成都', '重庆', '长沙', '长春']
  // 更多城市...
}
</script>

<style scoped>
.hot-cities {
  display: flex;
  flex-wrap: wrap;
  padding: 16px 20px;
  gap: 12px;
}

.city-tag {
  padding: 8px 16px;
  background-color: #f5f7fa;
  border-radius: 16px;
  font-size: 14px;
}

.city-item {
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
}
</style>
```

### 自定义索引样式

```vue
<template>
  <wd-index-bar class="my-index-bar">
    <wd-index-anchor index="1">
      <view class="custom-anchor">第一章</view>
    </wd-index-anchor>
    <view class="chapter-content">
      <view class="content-item">第一节</view>
      <view class="content-item">第二节</view>
    </view>
    
    <wd-index-anchor index="2">
      <view class="custom-anchor">第二章</view>
    </wd-index-anchor>
    <view class="chapter-content">
      <view class="content-item">第一节</view>
      <view class="content-item">第二节</view>
    </view>
  </wd-index-bar>
</template>

<style scoped>
.my-index-bar {
  --wd-index-bar-sidebar-bg: #f5f7fa;
  --wd-index-bar-index-color: #606266;
  --wd-index-bar-index-active-color: #1989fa;
  --wd-index-bar-index-font-size: 12px;
}

.custom-anchor {
  font-weight: bold;
  color: #303133;
  padding: 16px 20px;
  background-color: #fafafa;
}

.chapter-content {
  padding: 0 20px;
}

.content-item {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}
</style>
```

### 数字索引列表

```vue
<template>
  <wd-index-bar :sticky="true">
    <wd-index-anchor index="0"></wd-index-anchor>
    <view class="number-item" v-for="i in 8" :key="i">数字0-{{ i }}</view>
    
    <wd-index-anchor index="1"></wd-index-anchor>
    <view class="number-item" v-for="i in 10" :key="i">数字1-{{ i }}</view>
    
    <wd-index-anchor index="2"></wd-index-anchor>
    <view class="number-item" v-for="i in 10" :key="i">数字2-{{ i }}</view>
    
    <wd-index-anchor index="3"></wd-index-anchor>
    <view class="number-item" v-for="i in 10" :key="i">数字3-{{ i }}</view>
    
    <!-- 更多数字索引... -->
  </wd-index-bar>
</template>

<style scoped>
.number-item {
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
}
</style>
```

## 样式定制指南

### 使用 CSS 变量自定义样式

```vue
<template>
  <wd-index-bar class="custom-index-bar">
    <!-- 索引内容... -->
  </wd-index-bar>
</template>

<style scoped>
.custom-index-bar {
  /* 侧边栏背景色 */
  --wd-index-bar-sidebar-bg: #f0f2f5;
  /* 索引文字颜色 */
  --wd-index-bar-index-color: #666;
  /* 激活索引文字颜色 */
  --wd-index-bar-index-active-color: #1989fa;
  /* 索引文字大小 */
  --wd-index-bar-index-font-size: 14px;
  /* 索引项高度 */
  --wd-index-bar-index-height: 20px;
  /* 吸顶锚点背景色 */
  --wd-index-bar-sticky-bg: #fff;
  /* 吸顶锚点文字颜色 */
  --wd-index-bar-sticky-color: #333;
}
</style>
```

### 使用 customClass 自定义类名

```vue
<template>
  <wd-index-bar custom-class="my-index-bar">
    <!-- 索引内容... -->
  </wd-index-bar>
</template>

<style scoped>
.my-index-bar {
  /* 自定义样式 */
}

/* 自定义侧边栏样式 */
.my-index-bar .wd-index-bar__sidebar {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin-right: 8px;
}

/* 自定义索引项样式 */
.my-index-bar .wd-index-bar__index {
  padding: 0 8px;
}

/* 自定义激活索引样式 */
.my-index-bar .wd-index-bar__index.is-active {
  background-color: #1989fa;
  color: white;
  border-radius: 10px;
}
</style>
```

## 注意事项

1. **父子组件关系**：IndexBar 组件必须包含 IndexAnchor 子组件才能正常工作。

2. **sticky 属性**：当 sticky 为 true 时，当前激活的锚点会自动吸顶显示，提升用户体验。

3. **触摸交互**：IndexBar 支持触摸滑动索引栏来快速导航，触摸事件会被阻止冒泡和默认行为。

4. **性能优化**：对于包含大量锚点的长列表，建议合理使用虚拟滚动等技术优化性能。

5. **索引顺序**：IndexAnchor 组件的顺序应该与列表内容的顺序保持一致，以确保索引导航的准确性。

6. **平台兼容性**：在不同平台上，触摸滑动的灵敏度可能存在细微差异，建议在各平台进行测试。

7. **自定义内容**：通过 IndexAnchor 的默认插槽可以自定义锚点的显示内容，丰富索引列表的展示形式。

8. **滚动容器**：IndexBar 组件内部使用了 scroll-view 组件，因此不需要再嵌套其他滚动容器。