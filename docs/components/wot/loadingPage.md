# LoadingPage 页面加载

## 组件概述

LoadingPage 页面加载组件用于全页面的加载状态展示，覆盖整个页面区域。支持自定义加载图标、文案、背景色等。适用于页面初始化、数据预加载等场景。

## 核心功能描述

- **全屏覆盖**：覆盖整个页面区域
- **自定义图标**：支持自定义加载图标类型和颜色
- **自定义文案**：支持自定义加载提示文案
- **自定义背景**：支持自定义背景色
- **图标大小**：支持自定义图标大小

## 适用业务场景

- **页面初始化**：页面数据加载时显示全屏加载
- **数据预加载**：应用启动时预加载关键数据

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| loading | Boolean | true | 否 | 是否加载中 |
| icon | String | 'ring' | 否 | 加载图标类型，可选值：ring / outline / circle |
| iconSize | String | '40px' | 否 | 加载图标大小 |
| iconColor | String | '#4D80F0' | 否 | 加载图标颜色 |
| text | String | - | 否 | 加载提示文案 |
| textColor | String | '#333' | 否 | 文案颜色 |
| bgColor | String | '#fff' | 否 | 背景颜色 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-loading-page :loading="loading" />
  <view v-if="!loading">页面内容</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 2000)
</script>
```

### 示例2：自定义样式

```vue
<template>
  <wd-loading-page
    :loading="loading"
    icon="circle"
    icon-color="#07c160"
    text="正在加载..."
    bg-color="#f5f5f5"
  />
</template>
```
### 示例3：自定义加载提示

```vue
<template>
  <wd-loading-page loading-text="正在加载中..." />
</template>
```

通过 loading-text 自定义加载提示文案。
## 注意事项

- `loading` 为 false 时组件自动隐藏
- 组件使用 `position: fixed` 覆盖全屏