# Card 卡片

<demo-model url="/subPages/card/Index"></demo-model>

## 组件概况

### 组件概述
Card 卡片组件是一个容器组件，用于将相关内容组织成一个独立的视觉单元，具有清晰的边界和结构，常用于展示产品信息、文章摘要、用户信息等场景。

### 详细功能描述
- 支持卡片标题、内容和底部三个区域的布局
- 支持矩形卡片类型
- 支持自定义标题、内容和底部的样式类
- 支持通过插槽自定义各区域的内容
- 提供灵活的样式定制能力

### 适用业务场景
- 产品列表展示
- 文章摘要卡片
- 用户信息卡片
- 数据统计卡片
- 功能入口卡片

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| type | string | - | 否 | 卡片类型，目前仅支持'rectangle'（矩形） |
| title | string | - | 否 | 卡片标题 |
| customTitleClass | string | - | 否 | 标题自定义样式类 |
| customContentClass | string | - | 否 | 内容自定义样式类 |
| customFooterClass | string | - | 否 | 底部自定义样式类 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有定义任何事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 卡片内容区域 |
| title | - | 卡片标题区域 |
| footer | - | 卡片底部区域 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <wd-card title="基础卡片">
    <view class="card-content">
      <text class="content-text">这是一个基础的卡片组件，用于展示简单的内容。</text>
    </view>
  </wd-card>
</template>

<script lang="ts" setup>
// 基础卡片用法，展示标题和内容
</script>

<style scoped>
.card-content {
  padding: 20rpx;
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
}
</style>
```

### 2. 带底部区域的卡片

```vue
<template>
  <wd-card title="带底部卡片">
    <view class="card-content">
      <text class="content-text">这是一个带有底部区域的卡片组件，可以在底部添加操作按钮或其他内容。</text>
    </view>
    <template #footer>
      <view class="card-footer">
        <wd-button type="primary" size="small">立即购买</wd-button>
        <wd-button size="small" style="margin-left: 20rpx;">加入购物车</wd-button>
      </view>
    </template>
  </wd-card>
</template>

<script lang="ts" setup>
// 带底部区域的卡片用法
</script>

<style scoped>
.card-content {
  padding: 20rpx;
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20rpx;
  border-top: 1rpx solid #ebedf0;
}
</style>
```

### 3. 自定义标题卡片

```vue
<template>
  <wd-card>
    <template #title>
      <view class="custom-title">
        <wd-icon name="info" color="#4D80F0" size="28rpx" style="margin-right: 10rpx;"></wd-icon>
        <text class="title-text">自定义标题卡片</text>
      </view>
    </template>
    <view class="card-content">
      <text class="content-text">这是一个使用插槽自定义标题的卡片组件，可以添加图标、自定义样式等。</text>
    </view>
  </wd-card>
</template>

<script lang="ts" setup>
// 自定义标题卡片用法
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.card-content {
  padding: 20rpx;
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
}
</style>
```

### 4. 矩形卡片

```vue
<template>
  <wd-card type="rectangle" title="矩形卡片">
    <view class="card-content">
      <text class="content-text">这是一个矩形卡片，没有圆角或只有很小的圆角，适合展示简洁的内容。</text>
    </view>
  </wd-card>
</template>

<script lang="ts" setup>
// 矩形卡片用法
</script>

<style scoped>
.card-content {
  padding: 20rpx;
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
}
</style>
```

### 5. 自定义样式卡片

```vue
<template>
  <wd-card 
    title="自定义样式卡片" 
    customClass="my-card" 
    customContentClass="my-content" 
    customFooterClass="my-footer"
  >
    <view class="card-content">
      <text class="content-text">这是一个自定义样式的卡片，通过customClass、customContentClass和customFooterClass属性可以自定义各部分的样式。</text>
    </view>
    <template #footer>
      <view class="card-footer">
        <wd-button type="success" size="small">确认</wd-button>
        <wd-button size="small" style="margin-left: 20rpx;">取消</wd-button>
      </view>
    </template>
  </wd-card>
</template>

<script lang="ts" setup>
// 自定义样式卡片用法
</script>

<style scoped>
/* 自定义卡片根元素样式 */
:deep(.my-card) {
  margin: 20rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 自定义内容区域样式 */
:deep(.my-content) {
  background-color: #f5f7fa;
  padding: 30rpx;
}

/* 自定义底部区域样式 */
:deep(.my-footer) {
  border-top: 2rpx solid #ebedf0;
  padding: 20rpx 30rpx;
}

.card-content {
  padding: 10rpx 0;
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-card 
    title="自定义样式" 
    customStyle="margin: 20rpx; border-radius: 12rpx;"
  >
    <view class="card-content">
      <text class="content-text">使用customStyle属性可以直接设置卡片根元素的内联样式。</text>
    </view>
  </wd-card>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-card 
    title="自定义类名" 
    customClass="custom-card"
  >
    <view class="card-content">
      <text class="content-text">使用customClass属性可以为卡片根元素添加自定义类名，然后在样式中进行定制。</text>
    </view>
  </wd-card>
</template>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.custom-card) {
  margin: 20rpx;
  background-color: #f0f2f5;
  border-radius: 12rpx;
  overflow: hidden;
}
</style>
```

### 3. 自定义各区域样式

```vue
<template>
  <wd-card 
    title="自定义区域样式" 
    customTitleClass="custom-title" 
    customContentClass="custom-content" 
    customFooterClass="custom-footer"
  >
    <view class="card-content">
      <text class="content-text">可以分别为标题、内容和底部区域添加自定义样式类。</text>
    </view>
    <template #footer>
      <view class="card-footer">
        <wd-button type="primary" size="small">按钮</wd-button>
      </view>
    </template>
  </wd-card>
</template>

<style scoped>
/* 自定义标题样式 */
:deep(.custom-title) {
  background-color: #4D80F0;
  color: #fff;
  padding: 20rpx 30rpx;
}

/* 自定义内容样式 */
:deep(.custom-content) {
  padding: 30rpx;
  background-color: #f5f7fa;
}

/* 自定义底部样式 */
:deep(.custom-footer) {
  padding: 20rpx 30rpx;
  background-color: #fff;
  border-top: 1rpx solid #ebedf0;
}
</style>
```

## 注意事项

1. **卡片类型**：目前type属性仅支持'rectangle'（矩形），不设置时为默认样式。

2. **标题显示**：当同时设置title属性和title插槽时，title属性优先级更高，会覆盖插槽内容。

3. **底部显示**：只有当提供footer插槽时，底部区域才会显示。

4. **样式隔离**：组件使用了styleIsolation: 'shared'，可以直接覆盖组件内部样式。

5. **自定义类名**：customTitleClass、customContentClass和customFooterClass属性可以为对应区域添加自定义样式类，便于进行样式定制。

6. **性能优化**：避免在卡片内部放置过于复杂的内容或大量数据，以免影响渲染性能。

7. **响应式设计**：卡片组件会自适应父容器的宽度，建议在不同屏幕尺寸下测试显示效果。

8. **嵌套使用**：卡片组件可以嵌套使用，但建议不要嵌套过深，以免影响页面结构的清晰度。