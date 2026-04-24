# Skeleton 骨架屏

## 组件概况

Skeleton 骨架屏组件用于在内容加载完成前展示页面的大致结构，提升用户感知的加载速度。支持段落、头像、自定义模板等模式，可设置动画效果。

## 核心功能描述

- **段落模式**：通过 `row` 设置骨架行数
- **头像模式**：通过 `avatar` 显示头像占位
- **自定义模板**：通过插槽自定义骨架结构
- **动画效果**：通过 `animate` 开启骨架动画
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
| animate | Boolean | true | 否 | 是否开启动画 |
| row | Number | 0 | 否 | 段落占位行数 |
| rowWidth | String / Array | '100%' | 否 | 段落行宽度，可传数组设置每行宽度 |
| rowHeight | String / Array | '16px' | 否 | 段落行高度，可传数组设置每行高度 |
| avatar | Boolean | false | 否 | 是否显示头像占位 |
| avatarSize | String | '32px' | 否 | 头像占位大小 |
| avatarShape | String | 'round' | 否 | 头像形状，可选值：round / square |
| title | Boolean | false | 否 | 是否显示标题占位 |
| titleWidth | String | '40%' | 否 | 标题占位宽度 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | loading 为 false 时显示的内容 |
| template | - | 自定义骨架模板 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-skeleton :row="3" title avatar />
</template>
```

### 示例2：加载切换

```vue
<template>
  <wd-skeleton :loading="loading" :row="3" title avatar>
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

### 示例3：自定义模板

```vue
<template>
  <wd-skeleton :loading="loading">
    <template #template>
      <view style="display: flex; gap: 12px;">
        <wd-skeleton-item type="avatar" />
        <view style="flex: 1;">
          <wd-skeleton-item type="title" />
          <wd-skeleton-item type="row" />
          <wd-skeleton-item type="row" />
        </view>
      </view>
    </template>
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

### 示例4：自定义行宽

```vue
<template>
  <wd-skeleton :row="3" :row-width="['100%', '60%', '80%']" title />
</template>
```

## 注意事项

- `loading` 为 true 时显示骨架屏，为 false 时显示默认插槽内容
- `rowWidth` 和 `rowHeight` 支持字符串和数组，数组可分别设置每行的宽度/高度
- 自定义模板通过 `template` 插槽实现，需配合 `wd-skeleton-item` 使用
