# Backtop 回到顶部

## 组件概述

Backtop 回到顶部组件提供快速回到页面顶部的功能，当页面滚动超过指定距离时显示，点击后平滑滚动到顶部。支持自定义图标、形状、位置等。

## 核心功能描述

- **自动显示**：滚动超过指定距离时自动显示
- **平滑滚动**：点击后平滑滚动到顶部
- **自定义图标**：支持自定义图标样式
- **自定义形状**：支持圆形和方形
- **自定义位置**：支持自定义距离底部和右侧的距离

## 适用业务场景

- **长列表**：长列表页面快速回到顶部
- **文章阅读**：长文章阅读时快速回到顶部
- **商品详情**：商品详情页快速回到顶部

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| scrollTop | Number | - | 是 | 页面滚动距离 |
| top | Number | 300 | 否 | 距离顶部多少距离时显示 |
| duration | Number | 100 | 否 | 返回顶部滚动时间，单位 ms |
| zIndex | Number | 10 | 否 | 层级 |
| iconStyle | String | '' | 否 | 图标样式 |
| shape | String | 'circle' | 否 | 形状，可选值：circle / square |
| bottom | Number | 100 | 否 | 距离屏幕底部距离 |
| right | Number | 20 | 否 | 距离屏幕右边距离 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击回到顶部按钮时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-backtop :scroll-top="scrollTop" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const scrollTop = ref(0)

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>
```

### 示例2：自定义位置与形状

```vue
<template>
  <wd-backtop :scroll-top="scrollTop" shape="square" :bottom="150" :right="30" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'

const scrollTop = ref(0)

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>
```

### 示例3：自定义图标与底部距离

```vue
<template>
  <wd-backtop icon="arrow-up" :bottom="100" :right="20" />
</template>
```

自定义图标和距底部距离。
## 注意事项

- `scrollTop` 为必填属性，需通过 `onPageScroll` 获取页面滚动距离
- `duration` 设置为 0 时立即回到顶部，无动画效果