# Overlay 遮罩层

## 组件概况

Overlay 遮罩层组件创建一个覆盖全屏的半透明遮罩，常与弹出层组件配合使用。支持自定义动画时长、锁定滚动、层级设置等功能。

## 核心功能描述

- **全屏覆盖**：覆盖整个页面区域
- **动画效果**：支持淡入淡出动画，可自定义时长
- **锁定滚动**：通过 `lockScroll` 防止背景滚动
- **层级控制**：通过 `zIndex` 设置遮罩层级

## 适用业务场景

- **弹窗遮罩**：配合自定义弹窗使用
- **加载遮罩**：在数据加载时显示遮罩防止操作
- **引导遮罩**：在新手引导中高亮特定区域

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| show | Boolean | false | 否 | 是否显示遮罩层 |
| duration | Number / Object / Boolean | 300 | 否 | 动画时长，单位毫秒，false 表示无动画 |
| lockScroll | Boolean | true | 否 | 是否锁定滚动 |
| zIndex | Number | 10 | 否 | 层级 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击遮罩层时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-button @click="show = true">显示遮罩</wd-button>
  <wd-overlay :show="show" @click="show = false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例2：嵌入内容

```vue
<template>
  <wd-overlay :show="show" @click="show = false">
    <view class="content" @click.stop>
      <text>遮罩层内容</text>
    </view>
  </wd-overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例3：自定义透明度与点击事件

```vue
<template>
  <wd-overlay :show="show" :z-index="100" @click="show = false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

设置 z-index 层级，点击遮罩层关闭。
## 注意事项

- 点击遮罩层会触发 `click` 事件，通常在此事件中关闭遮罩
- 在遮罩层内嵌入内容时，需使用 `@click.stop` 阻止事件冒泡
- `duration` 为 false 时无动画效果