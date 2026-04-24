# Badge 徽章

## 组件概况

Badge 徽章组件用于在元素右上角展示数字、红点或自定义内容。支持最大值限制、自定义颜色、自定义位置等功能。

## 核心功能描述

- **数字徽章**：显示数字，支持最大值限制
- **红点徽章**：显示小红点
- **自定义内容**：通过插槽自定义徽章内容
- **独立使用**：可独立使用不包裹子元素
- **自定义颜色**：支持自定义背景色和字体色
- **自定义位置**：支持自定义偏移量

## 适用业务场景

- **消息提醒**：在图标右上角显示未读消息数量
- **状态标记**：标记商品的新品、热卖等状态
- **更新提示**：在Tab栏显示更新红点

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | null | 否 | 徽章显示值 |
| max | Number | - | 否 | 最大值，超过显示 max+ |
| isDot | Boolean | false | 否 | 是否点状徽章 |
| hidden | Boolean | false | 否 | 是否隐藏徽章 |
| type | String | - | 否 | 类型，可选值：primary / success / warning / danger / info |
| bgColor | String | - | 否 | 自定义背景色 |
| top | Number / String | - | 否 | 上下偏移量 |
| right | Number / String | - | 否 | 左右偏移量 |
| showZero | Boolean | false | 否 | 当数值为 0 时是否展示徽标 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 徽章包裹的子元素 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-badge :model-value="5">
    <view>消息</view>
  </wd-badge>
</template>
```

### 示例2：红点与最大值

```vue
<template>
  <wd-badge is-dot>
    <view>新消息</view>
  </wd-badge>
  <wd-badge :model-value="120" :max="99">
    <view>消息</view>
  </wd-badge>
</template>
```

### 示例3：独立使用

```vue
<template>
  <wd-badge :model-value="5" />
</template>
```

## 注意事项

- `modelValue` 为 0 或 null 时不显示徽章
- `isDot` 为 true 时忽略 `modelValue`，显示小红点
- `max` 仅在 `modelValue` 为数字时生效