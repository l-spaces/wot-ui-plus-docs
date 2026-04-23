# Tag 标签

## 组件概述

Tag 标签组件用于标记和分类，支持多种类型、幽灵模式、圆角、标记、可关闭、动态新增等功能。

## 核心功能描述

- **五种类型**：default、primary、success、warning、danger
- **幽灵模式**：通过 `plain` 设置幽灵标签
- **圆角标签**：通过 `round` 设置圆角
- **标记标签**：通过 `mark` 设置标记样式
- **可关闭**：通过 `closable` 显示关闭按钮
- **动态新增**：通过 `dynamic` 显示新增按钮
- **自定义颜色**：支持自定义文字颜色和背景色
- **图标**：支持左侧图标

## 适用业务场景

- **商品标签**：标记商品的新品、热卖、折扣等状态
- **筛选标签**：在筛选条件中使用标签展示已选条件
- **状态标记**：标记订单状态、审核状态等

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | 'default' | 否 | 标签类型，可选值：default / primary / success / warning / danger |
| plain | Boolean | false | 否 | 幽灵标签 |
| round | Boolean | false | 否 | 圆角标签 |
| mark | Boolean | false | 否 | 标记标签 |
| closable | Boolean | false | 否 | 是否可关闭 |
| dynamic | Boolean | false | 否 | 是否为新增标签 |
| icon | String | '' | 否 | 左侧图标 |
| useIconSlot | Boolean | false | 否 | 是否使用图标插槽 |
| color | String | '' | 否 | 文字颜色 |
| bgColor | String | '' | 否 | 背景色和边框色 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| close | 点击关闭按钮时触发 | - | - |
| click | 点击标签时触发 | - | - |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 标签内容 |
| icon | - | 自定义图标 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-tag type="primary">标签</wd-tag>
  <wd-tag type="success">标签</wd-tag>
  <wd-tag type="warning">标签</wd-tag>
  <wd-tag type="danger">标签</wd-tag>
</template>
```

### 示例2：幽灵与圆角

```vue
<template>
  <wd-tag plain>幽灵标签</wd-tag>
  <wd-tag round>圆角标签</wd-tag>
  <wd-tag mark>标记标签</wd-tag>
</template>
```

### 示例3：可关闭与动态新增

```vue
<template>
  <wd-tag closable @close="onClose">可关闭标签</wd-tag>
  <wd-tag dynamic @click="onAdd" />
</template>

<script lang="ts" setup>
function onClose() {
  console.log('标签已关闭')
}

function onAdd() {
  console.log('新增标签')
}
</script>
```

## 注意事项

- `closable` 仅在圆角类型下支持
- `dynamic` 标签显示 "+" 图标，点击触发 click 事件