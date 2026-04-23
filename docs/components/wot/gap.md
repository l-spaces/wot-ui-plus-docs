# Gap 间距

## 组件概述

Gap 间距组件用于在内容之间添加空白间距，支持自定义高度、背景色、底部安全区等。轻量级布局组件，常用于页面区块之间的间隔分隔，快速添加空白区域。

## 核心功能描述

- **自定义高度**：通过 `height` 设置间距高度，支持数字和字符串
- **背景颜色**：通过 `bgColor` 设置间隔区域背景颜色
- **底部安全区**：通过 `safeAreaBottom` 适配底部安全距离
- **自定义样式**：支持 `customStyle` 和 `customClass` 自定义样式

## 适用业务场景

- **列表分隔**：在列表项之间添加统一间距
- **区块间隔**：在页面不同内容区域之间添加间隔
- **背景分隔**：使用不同背景色区分内容区块

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| height | Number / String | 15 | 否 | 间距高度 |
| bgColor | String | 'transparent' | 否 | 背景颜色 |
| safeAreaBottom | Boolean | false | 否 | 是否开启底部安全区 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

默认高度 15px，背景透明。

```vue
<template>
  <wd-gap />
</template>
```

### 示例2：自定义背景颜色与高度

通过 `bg-color` 设置背景颜色，`height` 设置间距高度。

```vue
<template>
  <wd-gap bg-color="#4D80F0" />
  <wd-gap bg-color="#4D80F0" height="120rpx" />
</template>
```

### 示例3：底部安全区适配

通过 `safe-area-bottom` 开启底部安全区适配，适用于固定在底部的场景。

```vue
<template>
  <wd-gap bg-color="#333333" safe-area-bottom height="220rpx" />
</template>
```

## 注意事项

- 默认高度为 15px
- bgColor 默认为透明，可设置间隔区域的背景颜色
- 高度支持数字（px）和字符串（如 '2rem'、'120rpx'）
- safeAreaBottom 适用于页面底部需要适配安全距离的场景
