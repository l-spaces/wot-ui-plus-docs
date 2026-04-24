# Loading 加载

## 组件概况

Loading 加载组件用于页面或区块的加载状态展示，支持圆环、菊花、旋转三种加载图标类型。可自定义颜色、大小。

## 核心功能描述

- **三种图标**：ring（圆环）、outline（菊花）、spinner（旋转）
- **自定义颜色**：通过 `color` 设置加载图标颜色
- **自定义大小**：通过 `size` 设置加载图标大小

## 适用业务场景

- **页面加载**：在页面加载时显示加载动画
- **按钮加载**：在按钮中显示加载状态
- **区块加载**：在数据加载区域显示加载提示

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | 'ring' | 否 | 加载图标类型，可选值：ring / outline / spinner |
| color | String | '#4D80F0' | 否 | 加载图标颜色 |
| size | Number / String | '' | 否 | 加载图标大小 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-loading />
</template>
```

### 示例2：不同类型

```vue
<template>
  <wd-loading type="ring" />
  <wd-loading type="outline" />
  <wd-loading type="spinner" />
</template>
```

### 示例3：自定义颜色与大小

```vue
<template>
  <wd-loading color="#4D80F0" />
  <wd-loading size="40px" />
  <wd-loading color="#fa4350" size="20px" />
</template>
```

### 示例4：自定义大小（数字类型）

```vue
<template>
  <wd-loading :size="30" />
  <wd-loading :size="20" color="#4D80F0" />
</template>
```

## 注意事项

- `ring` 类型使用 SVG 绘制圆环动画
- `outline` 类型使用 CSS 绘制菊花动画
- `spinner` 类型使用 CSS 绘制旋转动画
- `size` 支持数字和字符串类型，数字类型单位为 px
