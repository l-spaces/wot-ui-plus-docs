# LoadMore 加载更多

## 组件概况

LoadMore 加载更多组件用于列表底部的加载状态展示，支持加载中、加载完成、没有更多数据三种状态。可自定义各状态的提示文案和图标。

## 核心功能描述

- **三种状态**：loading（加载中）、finished（加载完成）、error（加载失败）
- **自定义文案**：支持自定义各状态的提示文案
- **加载图标**：加载中状态显示旋转图标
- **错误重试**：加载失败状态可点击重新加载

## 适用业务场景

- **列表加载**：在长列表底部显示加载更多状态
- **分页数据**：配合分页请求展示加载状态
- **无数据提示**：数据加载完毕后显示"没有更多了"

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| state | String | 'loading' | 否 | 加载状态，可选值：loading / finished / error |
| loadingText | String | - | 否 | 加载中提示文案 |
| finishedText | String | - | 否 | 加载完成提示文案 |
| errorText | String | - | 否 | 加载失败提示文案 |
| iconSize | String | '14px' | 否 | 图标大小 |
| iconColor | String | - | 否 | 图标颜色 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| reload | error 状态下点击重新加载时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-load-more :state="state" @reload="onReload" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const state = ref('loading')

function onReload() {
  state.value = 'loading'
  setTimeout(() => {
    state.value = 'finished'
  }, 2000)
}
</script>
```

### 示例2：不同状态

```vue
<template>
  <wd-load-more state="loading" />
  <wd-load-more state="finished" finished-text="没有更多了" />
  <wd-load-more state="error" error-text="加载失败，点击重试" @reload="onReload" />
</template>

<script lang="ts" setup>
function onReload() {
  console.log('重新加载')
}
</script>
```

### 示例3：自定义状态文案

```vue
<template>
  <wd-load-more state="finished" finished-text="没有更多了" />
</template>
```

state 为 finished 时显示 finished-text 文案，自定义结束提示。
## 注意事项

- `state` 为 error 时点击会触发 `reload` 事件
- 各状态文案支持国际化，也可通过属性自定义