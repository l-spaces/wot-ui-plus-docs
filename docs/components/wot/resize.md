# Resize 自适应

## 组件概述

Resize 自适应组件用于监听子元素尺寸变化，当插槽内容尺寸发生变化时触发 `resize` 事件。通过内部 scroll-view 实现尺寸监听，适用于动态内容布局、响应式适配等场景。

## 核心功能描述

- **尺寸监听**：监听插槽内容的尺寸变化
- **完整信息**：返回 width、height、top、right、bottom、left 完整尺寸信息
- **自定义容器类**：通过 `customContainerClass` 自定义容器样式

## 适用业务场景

- **动态布局**：内容尺寸变化后自动调整布局
- **响应式适配**：监听元素尺寸变化进行适配
- **滚动联动**：内容变化后联动滚动位置

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| customContainerClass | String | '' | 否 | 自定义容器样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| resize | 插槽尺寸变化时触发 | ({ bottom, top, left, right, height, width }) | 元素的完整尺寸和位置信息 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 被监听尺寸变化的内容区域 |

## 使用示例

### 示例1：基础用法

使用 `wd-resize` 包裹需要监听的内容，通过 `@resize` 监听尺寸变化。

```vue
<template>
  <wd-resize @resize="handleResize">
    <view :style="`background: #4d80f0; width: ${width}; height: ${height}`"></view>
  </wd-resize>
  <view>宽度: {{ sizeWidth }}，高度: {{ sizeHeight }}</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const width = ref('100px')
const height = ref('100px')
const sizeWidth = ref('')
const sizeHeight = ref('')

function handleResize(detail: Record<string, string | number>) {
  sizeWidth.value = String(detail.width)
  sizeHeight.value = String(detail.height)
}
</script>
```

### 示例2：动态内容监听

当内容尺寸动态变化时，自动触发 resize 事件。

```vue
<template>
  <wd-resize @resize="handleResize">
    <view :style="`background: #4d80f0; width: ${width}; height: ${height}`"></view>
  </wd-resize>
  <wd-button @click="changeSize">改变尺寸</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const width = ref('100px')
const height = ref('100px')
const sizeWidth = ref('')
const sizeHeight = ref('')

function handleResize(detail: Record<string, string | number>) {
  sizeWidth.value = String(detail.width)
  sizeHeight.value = String(detail.height)
}

function changeSize() {
  width.value = '200px'
  height.value = '150px'
}
</script>
```

### 示例3：获取完整位置信息

resize 事件返回完整的尺寸和位置信息，包括 top、right、bottom、left。

```vue
<template>
  <wd-resize @resize="handleResize">
    <view style="background: #4d80f0; width: 100px; height: 100px"></view>
  </wd-resize>
  <view>top: {{ info.top }}</view>
  <view>right: {{ info.right }}</view>
  <view>bottom: {{ info.bottom }}</view>
  <view>left: {{ info.left }}</view>
  <view>width: {{ info.width }}</view>
  <view>height: {{ info.height }}</view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const info = reactive({
  top: '', right: '', bottom: '', left: '', width: '', height: ''
})

function handleResize(detail: Record<string, string | number>) {
  Object.assign(info, {
    top: String(detail.top),
    right: String(detail.right),
    bottom: String(detail.bottom),
    left: String(detail.left),
    width: String(detail.width),
    height: String(detail.height)
  })
}
</script>
```

## 注意事项

- Resize 组件通过内部 scroll-view 的 scroll 事件实现尺寸监听
- `resize` 事件在组件挂载时和内容尺寸变化时都会触发
- 返回的位置信息（top、right、bottom、left）是相对于视口的
- `customContainerClass` 应用于内部 container 元素，可用于调整容器样式
