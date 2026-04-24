# Skeleton 骨架屏

## 组件概况

Skeleton 骨架屏组件用于在内容加载完成前展示页面的大致结构，提升用户感知的加载速度。支持文本、头像、段落、图片等预设主题，可配置行列布局和动画效果。

## 核心功能描述

- **预设主题**：通过 `theme` 快速选择骨架屏风格（text / avatar / paragraph / image）
- **自定义行列**：通过 `rowCol` 精细控制每行每列的占位尺寸
- **动画效果**：支持渐变（gradient）和闪烁（flashed）两种动画类型
- **加载切换**：通过 `loading` 控制骨架/内容切换

## 适用业务场景

- **列表加载**：列表数据加载时显示骨架屏
- **详情加载**：详情页数据加载时显示骨架屏
- **卡片加载**：卡片内容加载时显示骨架屏

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| loading | Boolean | true | 否 | 是否显示骨架屏，false 时显示子组件内容 |
| theme | String | 'text' | 否 | 骨架屏风格，可选值：text / avatar / paragraph / image |
| rowCol | Array | - | 否 | 行列配置数组，自定义每行每列占位尺寸 |
| animation | String | '' | 否 | 动画类型，可选值：gradient / flashed |
| customStyle | Object | - | 否 | 自定义根节点样式 |
| customClass | String / Array / Object | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | loading 为 false 时显示的内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-skeleton theme="paragraph" />
</template>
```

### 示例2：加载切换

```vue
<template>
  <wd-skeleton :loading="loading" theme="avatar">
    <view>实际内容</view>
  </wd-skeleton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 2000)
</script>
```

### 示例3：自定义行列布局

```vue
<template>
  <wd-skeleton :row-col="[{ width: '100%' }, { width: '60%' }, { size: '32px', type: 'circle' }]" animation="gradient" />
</template>
```

### 示例4：不同动画效果

```vue
<template>
  <wd-skeleton theme="paragraph" animation="gradient" />
  <wd-skeleton theme="paragraph" animation="flashed" />
</template>
```

## 注意事项

- `loading` 为 true 时显示骨架屏，为 false 时显示默认插槽内容
- `rowCol` 数组中每个元素可配置 `width`、`height`、`size`、`type` 等属性
- `animation` 为空字符串时不显示动画效果
- `customStyle` 类型为 CSSProperties 对象，非字符串
